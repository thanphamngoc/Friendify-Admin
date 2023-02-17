import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Container from 'components/Container/Container';
import { breadcrumbs } from 'Routes';
import { useMemo } from 'react';

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const isHaveParams = Object.keys(params).length > 0;

  const updateParams = useMemo(() => {
    if (!isHaveParams) return;

    const array = pathname.split('/');
    array.map((value, index) => {
      Object.keys(params).forEach((key) => {
        if (params[key] === value) {
          array[index] = `:${key}`;
        }
      });
    });
    return array.join('/');
  }, [isHaveParams, params, pathname]);

  return (
    <Container>
      <div className='px-4'>
        <nav className="flex px-2 py-6 text-white sm:px-0" aria-label="Breadcrumb">
          <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
            {breadcrumbs?.[isHaveParams ? updateParams : pathname]?.length > 0 ? (
              <Link to={'/'} className="text-2xl hover:text-primary-hover">
                Dashboard
              </Link>
            ) : (
              <span className="text-2xl font-bold">Dashboard</span>
            )}
            {breadcrumbs?.[isHaveParams ? updateParams : pathname]?.map((item, index) => (
              <li key={`breadcrumb-${index}`}>
                <div className="flex items-center">
                  <FiChevronRight />
                  {item?.link ? (
                    <Link to={item?.link} className="ml-1 text-2xl hover:text-primary-hover md:ml-2">
                      {item?.name}
                    </Link>
                  ) : (
                    <span
                      className={classNames(
                        'ml-1 text-2xl md:ml-2 cursor-default',
                        item?.isActive && 'font-bold',
                      )}
                    >
                      {item.paramKey ? params?.[item.paramKey] : item?.name}
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
