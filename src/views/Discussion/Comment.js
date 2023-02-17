import discussionCommentApi from 'api/discussionCommentApi';
import axios from 'axios';
import ButtonRound from 'components/Button/ButtonRound';
import { showToastError } from 'components/CustomToast/CustomToast';
import ModalConfirm from 'components/Modal/ModalConfirm';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FiTrash, FiUser } from 'react-icons/fi';
import { Tooltip } from 'react-tippy';
import { ROW_PER_PAGE } from 'utils/constant';

function Comment({ data, onUpdateComment }) {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getDataApi = async () => {
      try {
        const replyRes = await discussionCommentApi.get({
          params: {
            discussion: data?.discussion,
            parent: data?._id,
            rowPerPage: ROW_PER_PAGE,
          },
          cancelToken: source.token,

        });
        setReplies(replyRes);
      } catch (e) {
        console.log(e.message);
      }
    };
    getDataApi();
    return () => {
      source.cancel('cancel');
    };
  }, [data?._id, data?.discussion]);

  const [deleteItem, setDeleteItem] = useState();

  const handleDelete = async () => {
    if (deleteItem?._id) {
      try {
        await discussionCommentApi.delete(deleteItem?._id);

        if (deleteItem?.parent) {
          const replyRes = await discussionCommentApi.get({
            params: {
              discussion: data?.discussion,
              parent: data?._id,
              rowPerPage: ROW_PER_PAGE,
            },
          });
          setReplies(replyRes);
        } else {
          const commentRes = await discussionCommentApi.get({
            params: {
              discussion: data?.discussion,
              rowPerPage: ROW_PER_PAGE,
            },
          });
          onUpdateComment(commentRes);
        }
        setDeleteItem();
      } catch (e) {
        console.log(e.message);
        showToastError(e.message);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between group">
        <div>
          <FiUser className="inline-block mb-1 mr-2" />
          <span className="pt-1">{data?.creator?.fullName}</span>
          <sub className="block pt-2">
            <span className="">Commented at: </span><span>{dayjs(data?.createdAt).format('DD/MM/YYYY HH:mm')}</span>
            <span className="ml-4">Reply: </span><span>{data?.child}</span>
          </sub>
        </div>
        <Tooltip title="Delete" theme='light'>
          <ButtonRound
            color="danger"
            className="px-2 opacity-0 hover:bg-danger hover:text-white group-hover:opacity-100"
            onClick={() => { setDeleteItem(data); }}
          >
            <FiTrash />
          </ButtonRound>
        </Tooltip>
      </div>

      <hr className='my-4' />

      <div className="pb-4 whitespace-pre-wrap">
        {data?.description}
      </div>
      {replies.map(reply => (
        <div key={reply?._id} className="relative pt-4 pl-8 lg:pl-14">
          <div className="absolute left-0 w-6 h-full lg:w-10 top-2 reply-branch" />
          <div className="p-4 rounded bg-slate-200">
            <div className='flex justify-between group'>
              <div>
                <FiUser className="inline-block mb-1 mr-2" />
                <span className="pt-1">{reply?.creator?.fullName}</span>
                <sub>
                  <span className="ml-4">replied at: </span><span>{dayjs(reply?.createdAt).format('DD/MM/YYYY HH:mm')}</span>
                </sub>
              </div>

              <Tooltip title="Delete" theme='light'>
                <ButtonRound
                  color="danger"
                  className="px-1 py-1 opacity-0 hover:bg-danger hover:text-white group-hover:opacity-100"
                  onClick={() => { setDeleteItem(reply); }}
                >
                  <FiTrash />
                </ButtonRound>
              </Tooltip>
            </div>
            <hr className='my-1 border-gray-300' />
            <div className="whitespace-pre-wrap">
              {reply?.description}
            </div>
          </div>
        </div>
      ))}
      {deleteItem?._id && (
        <ModalConfirm
          open
          onConfirm={handleDelete}
          onCancel={() => setDeleteItem()}
          onClose={() => setDeleteItem()}
          title={`Delete ${deleteItem?.parent ? 'reply' : 'comment'}`}
        >
          Are you sure you want to delete this {deleteItem?.parent ? 'reply' : 'comment'}?
        </ModalConfirm>
      )}
    </div>
  );
}

export default Comment;