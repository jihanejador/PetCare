<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RendezvousController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\FavoriteController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

Route::get('/pros/{id}', [UserController::class, 'showProProfile']);

Route::get('/categories', function () {
    return response()->json(Category::all());
});

Route::get('/services/{serviceId}/reviews', [ReviewController::class, 'getServiceReviews']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'update']);

    Route::post('/rendezvous', [RendezvousController::class, 'store']);
    Route::get('/pro/rendezvous', [RendezvousController::class, 'proIndex']);
    Route::patch('/rendezvous/{id}/status', [RendezvousController::class, 'updateStatus']);
    Route::patch('/rendezvous/{id}/cancel', [RendezvousController::class, 'cancel']);
    Route::get('/rendezvous/client', [RendezvousController::class, 'clientIndex']);
    Route::patch('/rendezvous/{id}/complete', [RendezvousController::class, 'markAsCompleted']);

    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/toggle', [FavoriteController::class, 'toggle']);

    Route::post('/reviews', [ReviewController::class, 'store']);
});
