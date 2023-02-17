import classNames from "classnames";

const CardList = ({ children, className }) => {
  return (
    <div className={classNames(
      'text-sm bg-white rounded-lg shadow-2xl',
      className
    )}>
      {children}
    </div>
  );
};

export default CardList;