const card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const AccessError = require('../errors/access-err');

module.exports.createCard = async (req, res, next) => {
  const {
    name,
    link,
    owner = req.user,
    likes = [],
    createAt,
  } = req.body;
  // eslint-disable-next-line new-cap
  await card.create({
    name,
    link,
    owner,
    likes,
    createAt,
  })
    .then((populateCard) => populateCard.populate('owner'))
    .then((newCard) => {
      if (!newCard) {
        throw new NotFoundError('Не удалось создать карточку');
      }
      res.send(newCard);
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  card.find({})
    .populate('owner')
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Карточки не найдены');
      }
      res.send(cards);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((dbCard) => {
      if (!dbCard) {
        throw new NotFoundError('Карта не надена');
      }
      if (dbCard.owner.toString() !== req.user) {
        throw new AccessError('Нет прав на удаление');
      }
      return card.deleteOne({ _id: dbCard._id })
        // eslint-disable-next-line consistent-return
        .then((c) => {
          if (c.deletedCount === 1) {
            return dbCard;
          }
        })
        .then((removedCard) => res.send({ data: removedCard }));
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user } },
    { new: true },
  )
    .populate('likes owner')
    .then((likedCard) => {
      if (likedCard) {
        res.send(likedCard);
      } else if (!likedCard) {
        throw new NotFoundError(`Данные не обновлены, карточка с id:${req.params.cardId} отсутствует`);
      }
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user } },
    { new: true },
  )
    .populate('likes owner')
    .then((dislikedCard) => {
      if (dislikedCard) {
        res.send(dislikedCard);
      } else {
        throw new NotFoundError(`Данные не обновлены, карточка с id:${req.params.cardId} отсутствует`);
      }
    })
    .catch(next);
};
