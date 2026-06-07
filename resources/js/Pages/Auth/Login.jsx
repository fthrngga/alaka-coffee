import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in - Alaka Coffee" />

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-serif font-bold text-text-main mb-2">Selamat Datang Kembali</h2>
                <p className="text-sm text-text-muted">Silakan masuk ke akun Anda untuk melanjutkan pesanan.</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-success">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        hasError={!!errors.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        hasError={!!errors.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-text-muted">
                            Ingat saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-primary-base hover:text-primary-dark hover:underline focus:outline-none focus:ring-2 focus:ring-primary-light rounded-md"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
                
                <div className="text-center mt-6 text-sm text-text-muted">
                    Belum punya akun?{' '}
                    <Link
                        href={route('register')}
                        className="text-primary-base font-semibold hover:text-primary-dark hover:underline focus:outline-none focus:ring-2 focus:ring-primary-light rounded-md"
                    >
                        Daftar sekarang
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
