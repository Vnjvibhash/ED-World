<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserListController extends Controller
{
    public function index(){
        $user_list = User::paginate(10);
        return view('admin.pages.users.user-list',compact('user_list'));
    }
    public function edit($id)
    {
        $get_user = User::find($id);
        $user['data'] = $get_user;
        return view('admin.pages.users.user-edit', $user);
    }
    public function delete($id)
    {
        $res = User::find($id);
		if ($res->avtar!="sabmohmayahai.jpg") {
            @unlink(public_path('/assets/images/profile/' . $res->avtar));
        }
        $res->delete();
        return back()->with('flash_success', 'User Deleted successfully');
    }
    public function update(Request $request, $id)
    {
        // dd($request,$id);
        if ($request->file('avtar')) {
            $image = $request->file('avtar');
            $imageName = 'avtar' . time() . '.' . $image->extension();
            $image->move(public_path('assets/images/profile'), $imageName);
        }

        $data =  User::find($id);
        $data->name = $request->post('name');
        $data->email = $request->post('email');
        $data->gender = $request->post('gender');
        $data->dob =  $request->post('dob');
        $data->avtar = $imageName ?? "sabmohmayahai.jpg";
        $data->save();

        return back()->with('flash_success', 'User Updated successfully');
    }
}
