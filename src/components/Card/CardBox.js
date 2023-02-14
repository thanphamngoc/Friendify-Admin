
export const CardBox = ({ children, title, className }) => {
  return (
    <div className={`pt-12 mx-auto bg-white shadow-2xl mb-14 break leading rounded-xl ${className}`}>
      <h1 className="pb-6 text-3xl font-bold text-center uppercase">
        {title}
      </h1>
      {children}
    </div>
  );
};
