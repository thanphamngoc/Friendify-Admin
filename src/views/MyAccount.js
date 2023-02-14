import Badge from 'components/Badge/Badge';
import { CardBox } from 'components/Card/CardBox';
import Container from 'components/Container/Container';
import { useGetUserLogin } from 'store/userLogin/hook';

const MyAccountPage = () => {
  const userLogin = useGetUserLogin();

  const listItems = [
    {
      id: 'fullName',
      label: 'Full Name',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'role',
      label: 'Role',
    },
    {
      id: 'status',
      type: 'badge',
      label: 'Status',
    },
    {
      id: 'referralId',
      label: 'Referral ID',
    }
  ];

  return (
    <Container>
      <CardBox title={userLogin?.fullName} className={'max-w-3xl'}>
        <div className="px-10 pb-6">
          {listItems.map(item => (
            <div key={item.id} className='flex py-4'>
              <label className="w-3/12">{item.label}</label>
              {item?.type === 'badge'
                ? <Badge color={'primary'}>{userLogin?.[item.id]}</Badge>
                : <p>{userLogin?.[item.id]}</p>}
            </div>
          ))}
        </div>
      </CardBox>
    </Container >
  );
};

export default MyAccountPage;