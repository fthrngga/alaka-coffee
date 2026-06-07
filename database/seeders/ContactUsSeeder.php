<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactUs;

class ContactUsSeeder extends Seeder
{
    public function run(): void
    {
        ContactUs::updateOrCreate(
            ['id' => 1],
            [
                'alamat' => 'Jl. Kopi Premium No. 1, Jakarta Selatan, Indonesia',
                'no_hp' => '+62 812-3456-7890',
                'email' => 'hello@alaka.coffee',
                'instagram' => '@alaka.coffee',
            ]
        );
    }
}
