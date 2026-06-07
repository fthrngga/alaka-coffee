<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detail_keranjang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_keranjang')->constrained('keranjang')->onDelete('cascade');
            $table->foreignId('id_menu')->constrained('menu')->onDelete('cascade');
            $table->integer('qty');
            $table->integer('subtotal');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('detail_keranjang');
    }
};
