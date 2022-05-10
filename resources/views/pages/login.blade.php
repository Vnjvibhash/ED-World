@extends('layouts.auth')
@section('content')

<!-- .login-box -->
<div class="login-box">
@if(Session::has('success'))
<div class="alert alert-success">
    <button type="button" class="close" data-dismiss="alert">×</button>
    {{ Session::get('success') }}
</div>
@endif
@if(Session::has('error'))
<div class="alert alert-danger">
    <button type="button" class="close" data-dismiss="alert">×</button>
    {{ Session::get('error') }}
</div>
@endif
<!-- /.login-logo -->
<div class="card card-outline card-primary">
  <a href="{{url('/')}}" style="align-self: end; margin:10px;"><i class="fa fa-close" style="font-size:24px;"></i></a>
  <div class="card-header text-center" style="margin-top:-20px">
    <a href="" class="h1"><b>ED-</b>World</a>
  </div>
  <div class="card-body">
    <p class="login-box-msg">Sign in to start your session</p>

    <form method="POST" action="{{route('auth.login')}}">
      @csrf
      <div class="input-group mb-3">
        <input id="email" type="email" class="form-control" name="email"  placeholder="Enter email" value="{{ old('email') }}">
        <div class="input-group-append">
          <div class="input-group-text">
            <span class="fas fa-envelope"></span>
          </div>
        </div>
      </div>
      <span class="text-danger">@error('email'){{ $message }}@enderror</span>
      <div class="input-group mb-3">
        <input id="password" type="password" class="form-control" name="password"  data-eye placeholder="Enter password">
        <div class="input-group-append">
          <div class="input-group-text">
            <span class="fas fa-lock"></span>
          </div>
        </div>
      </div>
      <span class="text-danger">@error('password'){{ $message }}@enderror</span>
      <div class="row">
        <div class="col-8">
          <div class="icheck-primary">
              <input type="checkbox" id="agreeTerms" class="form-control" name="terms" value="agree">
              <label for="agreeTerms">
               I agree to the <a href="#">terms</a>
              </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-4">
          <button type="submit" class="btn btn-primary btn-block">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    <div class="social-auth-links text-center mt-2 mb-3">
      <a href="#" class="btn btn-block btn-primary">
        <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
      </a>
      <a href="#" class="btn btn-block btn-danger">
        <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
      </a>
    </div>
    <!-- /.social-auth-links -->

    <p class="mb-1">
      <a href="forgot-password.html">I forgot my password</a>
    </p>
    <p class="mb-0">
      <a href="{{route('register')}}" class="text-center">Register a new membership</a>
    </p>
  </div>
  <!-- /.card-body -->
</div>
<!-- /.login-box -->

@endsection
