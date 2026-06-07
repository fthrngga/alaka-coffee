<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailKeranjang extends Model
{
    protected $table = 'detail_keranjang';

    protected $fillable = [
        'id_keranjang',
        'id_menu',
        'qty',
        'subtotal',
    ];

    public function keranjang()
    {
        return $this->belongsTo(Keranjang::class, 'id_keranjang');
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'id_menu');
    }
}
