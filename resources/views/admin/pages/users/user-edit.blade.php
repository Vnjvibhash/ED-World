@extends('admin.layouts.layout')
@section('content')
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Edit Users</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Edit Users</li>
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->
<!-- Main content -->
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
      @if(Session::has('flash_success'))
          <div class="alert alert-success">
            <button type="button" class="close" data-dismiss="alert">×</button>
            {{ Session::get('flash_success') }}
          </div>
          @endif
          @if(Session::has('flash_error'))
          <div class="alert alert-danger">
            <button type="button" class="close" data-dismiss="alert">×</button>
            {{ Session::get('flash_error') }}
          </div>
          @endif
          <form enctype="multipart/form-data" role="form" id="myform" method="post" action="{{ url('admin/update-user',$data->id) }}">
            @csrf
            <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">Edit</h3>
                    <div class="card-tools">
                      <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="inputName">Name</label>
                      <input type="text" id="inputName" name="name" class="form-control" value="{{$data->name ?? ''}}">
                    </div>
                    <div class="form-group">
                      <label for="inputDescription">Email</label>
                      <input type="text" id="inputEmail" name="email" class="form-control" value="{{$data->email ?? ''}}">
                    </div>
                    <div class="form-group">
                      <label for="inputStatus">Gender</label>
                      <select id="inputStatus" name="gender" class="form-control custom-select">
                        <option disabled="">Select one</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="inputClientCompany">Date of Birth</label>
                      <input type="date" id="inputdob" name="dob" class="form-control" value="{{$data->dob??''}}">
                    </div>
                    <div class="form-group">
                      <label for="inputProjectLeader">Profile Image</label>
                      <div class="image">
                        <img src="{{url('public/assets/images/profile').'/'.$data->avtar}}" class="profile-user-img img-fluid img-circle" alt="User Image">
                      </div>
                      <input type="file" id="inputProfile" name="avtar" class="form-control" value="{{$data->avtar ?? ''}}">
                    </div>
                    <div class="form-group">
                      <button id="submit" type="submit" class="btn btn-primary">Update User</button>
                    </div>
                  </div>
                  <!-- /.card-body -->
                </div>
              <!-- /.card -->
            </div>
          </form>
    </div>
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection
