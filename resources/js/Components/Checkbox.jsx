export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-text-muted/40 text-primary-base shadow-sm focus:ring-primary-light ' +
                className
            }
        />
    );
}
