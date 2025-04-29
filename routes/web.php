<?php

use App\Http\Controllers\AnswerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('level-1', [AnswerController::class, 'firstLevel']);
Route::post('/store', [AnswerController::class, 'submit']);

