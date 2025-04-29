<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $fillable = ['level'];

    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class);
    }
}
