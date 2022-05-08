<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserListController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [ HomeController::class, 'index']);
// Route::get('/logout',[ LoginController::class, 'index'])->name('logout');
Route::get('/login',[ LoginController::class, 'index'])->name('login');
Route::post('/auth-login',[ LoginController::class, 'login'])->name('auth.login');
Route::get('/register',[ RegisterController::class, 'index'])->name('register');
Route::post('/auth-register',[ RegisterController::class, 'register'])->name('auth.register');

Route::group(
    ['prefix' => 'admin'],
    function () {
        Route::group(
            ['middleware' => ['role:administrator']],
            function () {
                Route::get('dashboard', [ DashboardController::class, 'index'])->name('admin.dashboard');
                Route::get('setting', [ DashboardController::class, 'index'])->name('admin.setting');
                Route::post('logout', [ DashboardController::class, 'logout'])->name('admin.logout');
                Route::get('user-list', [ UserListController::class, 'index'])->name('admin.userlist');
                Route::get('edit-user/{id}', [ UserListController::class, 'edit'])->name('admin.edituser');
                Route::post('delete-user/{id}', [ UserListController::class, 'delete'])->name('admin.deleteuser');
                Route::post('update-user/{id}', [ UserListController::class, 'update'])->name('admin.updateuser');
            }
        );
    }
);