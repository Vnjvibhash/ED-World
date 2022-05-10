@extends('layouts.auth')
@section('content')

<div class="register-box">
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
  <div class="card card-outline card-primary">
    <a href="{{url('/')}}" style="align-self: end; margin:10px;"><i class="fa fa-close" style="font-size:24px;"></i></a>
    <div class="card-header text-center">
      <a href="#" class="h1"><b>ED-</b>World</a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Register a new membership</p>

      <form method="post" action="{{route('auth.register')}}">
      @csrf
        <div class="input-group mb-6">
          <input id="name" type="text" class="form-control" name="name"  autofocus placeholder="Enter name" value="{{ old('name') }}">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <span class="text-danger">@error('name'){{ $message }}@enderror</span>
        <div class="input-group mb-6">
          <input id="email" type="email" class="form-control" name="email"  placeholder="Enter email" value="{{ old('email') }}">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <span class="text-danger">@error('email'){{ $message }}@enderror</span>
        <div class="input-group mb-6">
          <input id="mobile" type="number" class="form-control" name="mobile"  placeholder="Enter mobile" value="{{ old('mobile') }}">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-phone"></span>
            </div>
          </div>
        </div>
        <span class="text-danger">@error('mobile'){{ $message }}@enderror</span>
        <div class="input-group mb-6">
          <input id="password" type="password" class="form-control" name="password"  data-eye placeholder="Enter password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <span class="text-danger">@error('password'){{ $message }}@enderror</span>
        <div class="input-group mb-6">
          <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required data-eye placeholder="Enter confirm password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <span class="text-danger">@error('password_confirmation'){{ $message }}@enderror</span>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="agreeTerms" name="terms" value="agree">
              <label for="agreeTerms">
               I agree to the <a href="#">terms</a>
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Register</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <div class="social-auth-links text-center">
        <a href="#" class="btn btn-block btn-primary">
          <i class="fab fa-facebook mr-2"></i>
          Sign up using Facebook
        </a>
        <a href="#" class="btn btn-block btn-danger">
          <i class="fab fa-google-plus mr-2"></i>
          Sign up using Google+
        </a>
      </div>

      <a href="{{route('login')}}" class="text-center">I already have a membership</a>
    </div>
    <!-- /.form-box -->
  </div><!-- /.card -->
</div>
<!-- /.register-box -->

@endsection
