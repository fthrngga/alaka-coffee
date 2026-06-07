import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, hasError = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                `border rounded-lg bg-[#FDFBFA] w-full px-4 py-3 outline-none transition-colors ${
                    hasError 
                        ? 'border-accent-promo focus:border-accent-promo focus:ring-1 focus:ring-accent-promo text-accent-promo' 
                        : 'border-text-muted/30 focus:border-primary-base focus:ring-1 focus:ring-primary-light text-text-main'
                } ` + className
            }
            ref={localRef}
        />
    );
});
