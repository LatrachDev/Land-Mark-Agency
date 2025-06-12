<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TeamController;

use App\Http\Controllers\Auth\AdminLoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::prefix('admin')->group(function () {
//     Route::resource('blogs', BlogController::class);
//     Route::resource('contacts', ContactController::class);
//     Route::resource('contents', ContentController::class);
//     Route::resource('projects', ProjectController::class);
//     Route::resource('teams', TeamController::class);
// });


Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::resource('blogs', BlogController::class);
    Route::resource('contacts', ContactController::class);
    Route::resource('contents', ContentController::class);
    Route::resource('projects', ProjectController::class);
    Route::resource('teams', TeamController::class);
});

Route::post('admin/login', [AdminLoginController::class, 'login']);
