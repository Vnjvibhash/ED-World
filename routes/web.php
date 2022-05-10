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
Route::get('/', [ HomeController::class, 'index'])->name('home');
Route::get('/practice', [ HomeController::class, 'practice'])->name('practice');
Route::get('/faqs', [ HomeController::class, 'faqs'])->name('faqs');
Route::get('/contact', [ HomeController::class, 'contact'])->name('contact');
Route::post('/contact-us', [ HomeController::class, 'contactus'])->name('contact-us');
Route::get('/about-us', [ HomeController::class, 'aboutus'])->name('about-us');
Route::get('/developer-list', [ HomeController::class, 'developerlist'])->name('developer-list');
Route::get('/developer', [ HomeController::class, 'developer'])->name('developer');
Route::get('/assignment', [ HomeController::class, 'assignment'])->name('assignment');
Route::post('/assignment-upload', [ HomeController::class, 'assignmentupload'])->name('assignment-upload');
// to change the name of stream in desirable stream related to auth.blade(shiv)
Route::get('/engineering', [ HomeController::class, 'engineering'])->name('engineering');
// Route::get('/engineering', [ HomeController::class, 'engineering'])->name('engineering');
// Route::get('/engineering', [ HomeController::class, 'engineering'])->name('engineering');
// Route::get('/engineering', [ HomeController::class, 'engineering'])->name('engineering');
//



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