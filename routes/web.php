<?php

use App\Http\Controllers\AnswerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('level-1', [AnswerController::class, 'firstLevel']);
Route::get('level-2', [AnswerController::class, 'secondLevel']);
Route::get('level-3', [AnswerController::class, 'thirdLevel']);
Route::get('level-4', [AnswerController::class, 'fourthLevel']);
Route::post('/store', [AnswerController::class, 'submit']);

