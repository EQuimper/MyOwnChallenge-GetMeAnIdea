import Comment from './model';
import { Idea } from '../idea';
import { User } from '../user';

const setCommentInfo = comment => ({
  text: comment.text,
  author: comment.author,
  createdAt: comment.createdAt,
  idea: comment.idea
});

export const createComment = (req, res) => {
  const { text, userId } = req.body;

  const ideaPromise = new Promise((resolve, reject) => {
    Idea.findById(req.params.ideaId)
      .then(
        idea => resolve(idea),
        error => reject(error)
      );
  });

  const userPromise = new Promise((resolve, reject) => {
    User.findById(userId)
      .then(
        user => resolve(user),
        error => reject(error)
      );
  });

  const promiseAll = Promise.all([ideaPromise, userPromise])
    .then(
      values => {
        const idea = values[0];
        const user = values[1];

        const newComment = new Comment({ text, author: user._id, idea: idea._id });

        return newComment.save()
          .then(comment => {
            idea.comments.push(comment);
            return idea.save()
              .then(
                () => {
                  user.comments.push(comment);
                  return user.save()
                    .then(
                      () => res.status(201).json({ success: true, comment: setCommentInfo(comment) }),
                      error => res.status(422).json({ success: false, error })
                    );
                },
                error => res.status(422).json({ success: false, error })
              );
          });
      },
      error => res.status(422).json({ success: false, error })
    );

  return promiseAll;
};