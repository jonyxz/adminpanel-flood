const Button = ({ children, className, ...props }) => {
    return (
        <button
            {...props}
            className={`cursor-pointer rounded px-4 py-2 text-sm font-bold focus:outline-none ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;