<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'name', 'description', 'imageUrl', 'motherboard_id', 'processor_id', 'ramMemory_id', 'ramMemoryAmount', 'graphicCard_id', 'graphicCardAmount', 'powerSupply_id'
    ];

    public function motherboard() {
        return $this-> belongsTo(Motherboard::class);
    }

    public function processor() {
        return $this-> belongsTo(Processor::class);
    }

    public function ramMemory() {
        return $this-> belongsTo(RamMemory::class);
    }

    public function graphicCard() {
        return $this-> belongsTo(GraphicCard::class);
    }

    public function powerSupply() {
        return $this-> belongsTo(PowerSupply::class);
    }

    protected $table = 'machine';

    use HasFactory;
}
