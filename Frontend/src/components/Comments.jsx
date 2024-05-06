import React, { useEffect, useState } from 'react';
import { gql, useSubscription, useMutation, useQuery } from "@apollo/client";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentAnswerIdState, usernameState, commentsState } from '../Recoil';

const SUBSCRIBE_TO_COMMENTS = gql`
  subscription Subscription {
    newComment {
      answerId
      user
      comments
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($answerId: String!, $user: String!, $comments: String!) {
    addComment(answerId: $answerId, user: $user, comments: $comments) {
      answerId
      user
      comments
    }
  }
`;

const GET_COMMENTS = gql`
  query getComments {
    comments {
      answerId
      comments
      id
      user
    }
  }
`;

function CommentsComponent() {
  const answerId = useRecoilValue(currentAnswerIdState);
  const username = useRecoilValue(usernameState);
  const comments = useRecoilValue(commentsState);
  const setComments = useSetRecoilState(commentsState);

  const [commentInput, setCommentInput] = useState('');
  const { loading, error, data } = useQuery(GET_COMMENTS);

  useEffect(() => {
    if (data) {
      setComments(data.comments);
    }
  }, [data, setComments]);

  const { loading: subLoad, error: subError } = useSubscription(
    SUBSCRIBE_TO_COMMENTS,
    {
      variables: { answerId },
      onSubscriptionData: ({ subscriptionData }) => {
        if (subscriptionData.data) {
          setComments(currentComments => [
            ...currentComments,
            subscriptionData.data.newComment
          ]);
        }
      }
    }
  );

  const [addComment] = useMutation(ADD_COMMENT);

  const handleAddComment = () => {
    if (!username) {
      console.error("Username is empty or undefined");
      return;
    }

    addComment({
      variables: {
        answerId,
        user: username,
        comments: commentInput,
      },
    });

    // Clear the input box
    setCommentInput('');
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments!</p>;

  return (
    <div className='flex flex-col gap-y-10 p-2 w-96 m-5  '>
      <h3 className='font-semibold	text-xl m-1	'>Comments:</h3>
      <div className='flex flex-col gap-y-3 items-center justify-center '>
      {comments
        .filter(comment => comment.answerId === answerId)
        .map((comment, index) => (
          <div key={index}>
            <p className='flex justify-between p-5 w-80 rounded shadow-xl'><span className='text-lg'>{comment.comments}</span><span className='text-sm'>~{comment.user}</span> </p>
          </div>
        ))
      }
      </div>
      <div className='flex w-98 justify-between m-1 gap-x-2'>
        <input
        type="text"
        value={commentInput}
        className="h-10 w-64 border border-green-500 rounded-md"
        onChange={(e) => setCommentInput(e.target.value)}
      />
      <button onClick={handleAddComment} className='bg-green-500 rounded-full h-10 w-10'>+</button>
      
      </div>
    </div>
  );
}

export default CommentsComponent;
