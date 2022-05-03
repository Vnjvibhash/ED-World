@extends('admin.layouts.layout')
@section('content')
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Users List</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Users List</li>
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
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">User List</h3>
          </div>
          @if(Session::has('flash_success'))
          <div class="alert alert-success">
            <button type="button" class="close" data-dismiss="alert">×</button>
            {{ Session::get('flash_success') }}
          </div>
          @endif
          <!-- /.card-header -->
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>
                @foreach($user_list as $row)
                <tr>
                  <td>{{$row->id}}</td>
                  <td>{{$row->name}}</td>
                  <td>{{$row->email}}</td>
                  <td>
                    <a href="{{ url('admin/edit-user/'. $row->id) }}" class="btn"><i class="fas fa-edit" style="color: blue;"></i></a>
                    <button form="resource-delete-{{ $row->id }}"><i style="color: red;" class="fas fa-trash-alt"></i></button>
                    @csrf
                    @method('DELETE')
                    <form id="resource-delete-{{ $row->id }}" action="{{ url('admin/delete-user/'. $row->id) }}" style="display: inline-block;" onSubmit="return confirm('Are you sure you want to delete this item?');">
                    </form>
                  </td>
                </tr>
                @endforeach
              </tbody>
            </table>
            <br>
            {!! $user_list->links() !!}
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection