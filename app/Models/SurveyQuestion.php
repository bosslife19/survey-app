<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    protected $fillable = ['question'];

    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class);
    }
}
