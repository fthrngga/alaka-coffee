<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'menu';

    protected $fillable = [
        'id_kategori',
        'nama_menu',
        'deskripsi',
        'harga',
        'gambar',
        'stok',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'id_kategori');
    }

    public function detailKeranjang()
    {
        return $this->hasMany(DetailKeranjang::class, 'id_menu');
    }

    public function detailPesanan()
    {
        return $this->hasMany(DetailPesanan::class, 'id_menu');
    }
}
