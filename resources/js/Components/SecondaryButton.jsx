export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center bg-transparent border-[1.5px] border-primary-base px-4 py-3 text-sm font-semibold tracking-wide text-primary-base transition-all duration-300 rounded-xl hover:bg-primary-base hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 ${
                    disabled && 'opacity-50 pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
