import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Container from 'components/Container/Container';
import { breadcrumbs } from 'Routes';

const Breadcrumb = () => {
  const { pathname } = useLocation();
  
  return (
    <Container>
      <div className='px-4'>
        <nav className="flex px-2 py-6 text-white sm:px-0" aria-label="Breadcrumb">
          <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
            {breadcrumbs[pathname].length > 0 ? (
              <Link to={'/'} className="text-2xl hover:text-primary">
                Dashboard
              </Link>
            ) : (
              <span className="text-2xl font-bold">Dashboard</span>
            )}
            {breadcrumbs[pathname]?.map((item, index) => (
              <li key={`breadcrumb-${index}`}>
                <div className="flex items-center">
                  <FiChevronRight />
                  {item?.link ? (
                    <Link to={item?.link} className="ml-1 text-2xl hover:text-primary md:ml-2">
                      {item?.name}
                    </Link>
                  ) : (
                    <span
                      className={classNames(
                        'ml-1 text-2xl font-bold hover:text-primary md:ml-2',
                        item?.isActive && 'text-primary',
                      )}
                    >
                      {item?.name}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </Container>
  );
};

Breadcrumb.propTypes = {
  breadcrumb: PropTypes.array,
};

export default Breadcrumb;