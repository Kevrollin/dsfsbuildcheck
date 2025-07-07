import React, { useState } from 'react';

type Comment = {
  user: string;
  avatar?: string;
  text: string;
};

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
};

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-lg p-4 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-lg text-white font-semibold mb-4 text-center">Comments</h2>

        {/* Comments List */}
        <div className="max-h-64 overflow-y-auto space-y-3">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex gap-3 items-start">
                <img
                  src={comment.avatar || '/placeholder-avatar.png'}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white text-sm">{comment.user}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center">No comments yet. Be the first!</p>
          )}
        </div>

        {/* Add Comment */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 px-3 py-2 text-sm text-white rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
