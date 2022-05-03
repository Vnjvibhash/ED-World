<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(){
        $auth_user = User::find(Auth::user()->id);
        return view('admin.pages.dashboard',compact('auth_user'));
    }
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('login');
    }
}
