<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        "full_name",
        "phone_number",
        "company_name",
        "message",
        "message",
        "interests",
    ];

    protected $casts = [
        'interests' => 'array',
    ];
}
