const { default: mongoose } = require('mongoose');
const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCard = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
  // .populate(['owner', 'likes'])
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .orFail()
        // .populate('owner')
        .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError('Карточки с таким id нету'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    // .populate(['owner', 'likes'])
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`Карточки с таким id ${req.params.cardId} нет `));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Некорректный id у карточки ${req.params.cardId} `));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(`Карточки с _id = '${req.params.cardId}' не существует`))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Карточка другого пользователя');
      }
      Card.deleteOne(card)
        .orFail()
        .then(() => {
          res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new BadRequestError(`Некорректный id у карточки ${req.params.cardId} `));
          } else {
            next(err);
          }
        });
    })
};

// module.exports.deleteCard = (req, res, next) => {
//   Card.findById(req.params.cardId)
//     .then((card) => {
//       if (!card) {
//         return next(new NotFoundError(`Карточки с таким id ${req.params.cardId} нет `));
//       }

//       if (!card.owner.equals(req.user._id)) {
//         throw new ForbiddenError('Карточка другого пользователя');
//       }

//       Card.deleteOne({ _id: req.params.cardId })
//         .orFail()
//         .then(() => {
//           res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
//         })
//         .catch((err) => {
//           if (err instanceof mongoose.Error.DocumentNotFoundError) {
//             next(new NotFoundError(`Карточки с таким id ${req.params.cardId} нет `));
//           } else if (err instanceof mongoose.Error.CastError) {
//             next(new BadRequestError(`Некорректный id у карточки ${req.params.cardId} `));
//           } else {
//             next(err);
//           }
//         });
//     })
//     .catch((err) => {
//         next(err);
//       }
//     );
// };

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    // .populate(['owner', 'likes'])
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`Карточки с таким id ${req.params.cardId} нет `));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Некорректный id у карточки ${req.params.cardId} `));
      } else {
        next(err);
      }
    });
};
