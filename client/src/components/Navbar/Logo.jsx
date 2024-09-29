export default function Logo({ handleClick, className }) {
  return (
    <div
      className={`cursor-pointer text-xl font-bold ${className}`}
      onClick={handleClick}
    >
      <span className='hidden lg:inline'>
        Management <span className='text-sm'>&nbsp;chuwa</span>
      </span>
      {/* Display on smaller screens */}
      <span className='inline lg:hidden'>
        M<span className='text-sm'>&nbsp;chuwa</span>
      </span>
    </div>
  );
}
