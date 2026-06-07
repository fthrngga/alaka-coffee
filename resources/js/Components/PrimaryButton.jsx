export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center bg-primary-base px-4 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 rounded-xl hover:bg-primary-light hover:-translate-y-[1px] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 ${
                    disabled && 'opacity-50 pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
