import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center sm:justify-center pt-6 sm:pt-0 bg-base text-text-main font-sans">
            <div>
                <Link href="/">
                    <h1 className="font-serif text-4xl text-primary-base font-bold tracking-tight">Alaka Coffee</h1>
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden bg-surface px-8 py-10 shadow-[0_10px_20px_rgba(92,61,46,0.05)] sm:max-w-md sm:rounded-2xl border border-[#EAE3DB]">
                {children}
            </div>
        </div>
    );
}
