<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('pages.home');
    }

    
    public function practice()
    {
        return view('pages.coding');
    }
    
    
    public function faqs()
    {
        return view('pages.faq');
    }
    
    
    public function contact()
    {
        return view('pages.contact');
    }

    public function contactus(Request $request)
    {
        //
    }

    public function aboutus()
    {
        return view('pages.aboutus');
    }

    public function developerlist()
    {
        return view('pages.developer-list');
    }

    public function developer()
    {
        return view('pages.developer');
    }

    public function assignment()
    {
        return view('pages.assignment');
    }

    public function assignmentupload(Request $request)
    {
        return view('pages.assignment_upload');
    }

    
    public function engineering()
    {
        return view("pages.engineering.index");
    }
    

    
    public function update(Request $request, $id)
    {
        //
    }

    
    public function destroy($id)
    {
        //
    }
}
