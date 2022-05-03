<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function index(){
        return view('pages.register');
    }

    function register(Request $request){
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        
        // dd($request);
         /** Make avata */

        //  $path = 'assets/images/profile/';
        //  $fontPath = public_path('fonts/Oliciy.ttf');
        //  $char = strtoupper($request->name[0]);
        //  $newAvatarName = rand(12,34353).time().'_avatar.png';
        //  $dest = $path.$newAvatarName;

        //  $createAvatar = makeAvatar($fontPath,$dest,$char);
        //  $picture = $createAvatar == true ? $newAvatarName : '';
        if($request->terms=="agree"){
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = \Hash::make($request->password);

            if( $user->save() ){
                $user->attachRole('user');
                return redirect()->route('auth.register')->with('success','You are now successfully registerd');
            }else{
                return redirect()->back()->with('error','Failed to register');
            }
        }else{
            return redirect()->back()->with('error','Failed to register');
        }
    }
}
