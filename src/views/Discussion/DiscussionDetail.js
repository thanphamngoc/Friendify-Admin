import discussionApi from 'api/discussionApi';
import discussionCommentApi from 'api/discussionCommentApi';
import axios from 'axios';
import Badge from 'components/Badge/Badge';
import CardList from 'components/Card/CardList';
import Container from 'components/Container/Container';
import { showToastError } from 'components/CustomToast/CustomToast';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { ROW_PER_PAGE } from 'utils/constant';
import Comment from './Comment';

const DiscussionDetailPage = () => {
  const [state, setState] = useState();
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getDataApi = async () => {
      try {
        const res = await discussionApi.getById(id, {
          cancelToken: source.token,
        });
        setState(res);

        const commentRes = await discussionCommentApi.get({
          params: {
            discussion: id,
            rowPerPage: ROW_PER_PAGE,
          },
          cancelToken: source.token,

        });
        setComments(commentRes);
      } catch (e) {
        if (e.message !== 'cancel') {
          showToastError(e.message);
        }
      }
    };

    getDataApi();
    return () => {
      source.cancel('cancel');
    };
  }, [id]);

  return (
    <Container className="" >
      <CardList className="p-4 px-6">
        <h2 className="text-2xl font-bold ">
          <FiUser className="inline-block mb-1 mr-2" />
          <span className="pt-1">{state?.creator?.fullName}</span>
        </h2>
        <sub>
          <span className="mr-1">Type: </span><Badge color="primary">{state?.type}</Badge>
          <span className="ml-4">Created at: </span><span>{dayjs(state?.createdAt).format('DD/MM/YYYY HH:mm')}</span>
          <span className="ml-4">Comment: </span><span>{state?.child}</span>

        </sub>
        <hr className='my-4' />
        <div className="whitespace-pre-wrap">
          {state?.description}
        </div>
      </CardList>

      {comments.length > 0 && (
        <p className="py-4 text-2xl font-bold text-white">
          Comment
        </p>
      )}

      {comments?.map(comment => (
        <CardList key={comment?._id} className="p-4 px-6 mb-4">
          <Comment data={comment} onUpdateComment={(res) => { setComments(res); }} />
        </CardList>
      ))}
    </Container>
  );
};

export default DiscussionDetailPage;