<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
    public function index(){
        return view('pages.login');
    }
    
    public function login(Request $request){
        // dd($request);
       $this->validate($request,[
           'email'=>'required|email',
           'password'=>'required'
       ]);

       $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        // if($request->terms=="agree"){
            if (Auth::attempt($credentials)) {
                $user = User::find(Auth::id());
                if ($user->roles()->first()->id == 2) {
                    return redirect()->route('admin.dashboard');
                    return back()->with('success', 'Logged in successfully');
                } else {
                    Auth::logout();
                    return back()->with('error', 'Customer Authentication failed');
                }
            } else {
                return back()->with('error','Email and password are wrong');
            }
        // }else{
        //     return redirect()->back()->with('error','Failed to register');
        // }
    }
}
