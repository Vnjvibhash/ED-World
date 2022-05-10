@extends('layouts.app')
@section('content')
<section id="breadcrumb" class="breadcrumb-section relative-position backgroud-style" style="background-image: url({{url('/')}}/public/assets/front/img/banner/Contact_us.jpg);">
	<div class="blakish-overlay"></div>
	<div class="container">
		<div class="page-breadcrumb-content text-center">
			<div class="page-breadcrumb-title">
				<h2 class="breadcrumb-head black bold"><span>ED-World -</span> <span>Contact Us</span></h2>
			</div>
		</div>
	</div>
</section>
<section id="contact-page" class="contact-page-section pb-3">
	<div class="container">
		<div class="section-title mb45 headline text-center">
			<span class="subtitle text-uppercase">SEND US A MESSAGE</span>
			<h2>Keep<span> In Touch.</span></h2>
		</div>
		<div class="social-contact">
			<div class="category-icon-title text-center">
				<div class="category-icon">
					<i class="text-gradiant fab fa-facebook-f"></i>
				</div>
				<div class="category-title">
					<h4>Facebook</h4>
				</div>
			</div>
			<div class="category-icon-title text-center">
				<div class="category-icon">
					<i class="text-gradiant fab fa-twitter"></i>
				</div>
				<div class="category-title">
					<h4>Twitter</h4>
				</div>
			</div>
			<div class="category-icon-title text-center">
				<div class="category-icon">
					<i class="text-gradiant fab fa-google-plus-g"></i>
				</div>
				<div class="category-title">
					<h4>Google +</h4>
				</div>
			</div>
			<div class="category-icon-title text-center">
				<div class="category-icon">
					<i class="text-gradiant fab fa-instagram"></i>
				</div>
				<div class="category-title">
					<h4>Instagram</h4>
				</div>
			</div>
			<div class="category-icon-title text-center">
				<div class="category-icon">
					<i class="text-gradiant fab fa-linkedin"></i>
				</div>
				<div class="category-title">
					<h4>LinkedIn</h4>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="contact-form" class="contact-form-area_3 contact-page-version pt-0 pb-2">
	<div class="container">
		<div class="section-title mb45 headline text-center">
			<span class="subtitle text-uppercase">Send us a message</span>
			<h2>Send Us A<span> Message</span></h2>
		</div>
		
		<div class="contact_third_form">
			<form class="contact_form" action="{{url('/')}}/contact_send_mail" method="POST">
				<input type="hidden" name="_token" value="se4upC8uIRWABlM85QFe7dxQOo01VOYm539hrhXx">
                <div class="row">
					<div class="col-md-4">
						<div class="contact-info">
							<input class="name" name="name" type="text" placeholder="Your Name *" required="">
						</div>
					</div>
					<div class="col-md-4">
						<div class="contact-info">
							<input class="email" name="email" type="email" placeholder="Your Email *" required="">
						</div>
					</div>
					<div class="col-md-4">
						<div class="contact-info">
							<input class="number" name="number" type="number" placeholder="Phone Number">
						</div>
					</div>
				</div>
				<textarea name="message" placeholder="Message"></textarea>
				<div class="nws-button text-center  gradient-bg text-uppercase">
					<button type="submit" value="Submit">SEND EMAIL <i class="fas fa-caret-right"></i></button> 
				</div>
			</form>
		</div>
	</div>
</section>

@endsection
