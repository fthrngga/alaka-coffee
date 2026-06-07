<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    protected $table = 'promo';

    protected $fillable = [
        'kode_promo',
        'tipe_diskon',
        'nilai_diskon',
        'minimal_belanja',
        'status',
    ];
}
