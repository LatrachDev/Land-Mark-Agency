<?php
use App\Http\Controllers\ContactController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Api\V1\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Api\V1\Admin\ContentController as AdminContentController;
use App\Http\Controllers\Api\V1\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\V1\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\Auth\AdminLoginController;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Authenticated admin user info
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/contact', [ContactController::class, 'store']);
Route::get('/home', [HomeController::class, 'home']);
Route::get('/portfolio', [HomeController::class, 'porftolio']);
Route::get('/about', [HomeController::class, 'teamMembers']);
Route::get('/blog', [HomeController::class, 'blog']);

// Admin login route (NO auth middleware)
Route::post('/admin/login', [AdminLoginController::class, 'login']);

// Protected admin routes (secured by sanctum)
Route::middleware('auth:sanctum')->prefix('v1/admin')->group(function () {
    // Route::get('/contact', [AdminContactController::class, 'index']);
    Route::apiResource('blogs', AdminBlogController::class);
    Route::apiResource('contents', AdminContentController::class);
    Route::apiResource('projects', AdminProjectController::class);
    Route::apiResource('teams', AdminTeamController::class);
    
    // Route::apiResource('contacts', AdminContactController::class);

    Route::get('contacts', [AdminContactController::class, 'index']);
    // Route::delete('contacts/delete-multiple', [AdminContactController::class, 'delete']);
    Route::delete('contacts/delete-multiple', [AdminContactController::class, 'delete']);
    Route::delete('contacts/{id}', [AdminContactController::class, 'destroy']);

    Route::put('contacts/mark-as-read', [AdminContactController::class, 'markAsRead']);

});
