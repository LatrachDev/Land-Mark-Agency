<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Api\V1\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Api\V1\Admin\ContentController as AdminContentController;
use App\Http\Controllers\Api\V1\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\V1\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\Auth\AdminLoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Authenticated admin user info
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Admin login route (NO auth middleware)
Route::post('/admin/login', [AdminLoginController::class, 'login']);

// Protected admin routes (secured by sanctum)
Route::middleware('auth:sanctum')->prefix('v1/admin')->group(function () {
    Route::apiResource('blogs', AdminBlogController::class);
    Route::apiResource('contacts', AdminContactController::class);
    Route::apiResource('contents', AdminContentController::class);
    Route::apiResource('projects', AdminProjectController::class);
    Route::apiResource('teams', AdminTeamController::class);
});
