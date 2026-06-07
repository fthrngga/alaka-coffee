import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Accordion from '@/Components/Accordion';

export default function Faq({ faq }) {
    return (
        <PublicLayout>
            <Head title="FAQ - Alaka Coffee" />
            
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-base mb-6">Frequently Asked Questions</h1>
                    <p className="text-text-muted text-lg">
                        Temukan jawaban untuk pertanyaan-pertanyaan yang sering ditanyakan oleh pelanggan kami.
                    </p>
                </div>

                {faq && faq.length > 0 ? (
                    <Accordion items={faq} />
                ) : (
                    <div className="text-center py-12 bg-surface rounded-2xl border border-[#EAE3DB]">
                        <p className="text-text-muted">Belum ada pertanyaan umum saat ini.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
