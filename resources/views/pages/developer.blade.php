@extends('layouts.app')
@section('content')
<section id="breadcrumb" class="breadcrumb-section relative-position backgroud-style" style="background-image: url({{url('/')}}/public/assets/front/img/banner/Enrollement.jpg);">
	<div class="blakish-overlay"></div>
	<div class="container">
		<div class="page-breadcrumb-content text-center">
			<div class="page-breadcrumb-title">
				<h2 class="breadcrumb-head black bold"><span>ED-World</span> <span>Developer Details</span></h2>
			</div>
		</div>
	</div>
</section>
<section class="teacher-details-area" id="teacher-details">
	<div class="container">
		<div class="row">
			<div class="col-md-9">
				<div class="teacher-details-content mb45">
					<div class="row">
						<div class="col-md-5">
							<div class="teacher-details-img">
                                <img style="object-fit: cover;" src="{{url('/')}}/public/assets/images/profiles/60b7cf01ba1dd.png" alt="" width="200">
                            </div>
						</div>
						<div class="col-md-7">

							<div class="teacher-details-text">
								<div class="section-title-2  headline text-left">
									<h2>Teacher <span>Veena Arvind</span></h2>
									<div class="teacher-deg">
										Specialities:
										<span>Sloka Course</span>,
                                        <span>Bhajans</span>,
                                        <span>Devotional Songs</span>,
                                        <span>Veena</span>,
										<span>Special Need Course</span>,
										</div>
								</div>
							</div>
							<div class="about-teacher mb45">

								<h4>About <span>Teacher.</span></h4>

								<p>Smt, Veena has&nbsp;been learning Veena since childhood. She has a strong passion towards learning Veena in particular and she has&nbsp;completed her certificate&nbsp;exam in Veena. In addition to this, she has&nbsp;completed her Junior and Senior portions in classical singing.</p>
								<p>She is a professional artist and a great teacher who is very polite and ensures to uses various techniques to make even the little ones drag attention and interest in Music.&nbsp; She has performed in various stages and now looking forward to propagate the art of veena playing to the younger generation.She has trained students of all age group.</p>
								<p>She also takes Devotional Songs, Slokas for all age groups and is known for handling <strong>Specially abled Children very well</strong> and has trained them very excellently.</p> <br><br>
								
								<h5>Qualification <span>in Music:</span></h5>
								senior certificate from Karnataka board for Vocal and Veena<br><br>
								
								<h5>Year<span> of Experience:</span></h5>
								10<br><br>
								
								<br><br>
								<h5>Guru/Teacher <span>Name:</span></h5>
							    Veena Guru is Govindswamy, Vocal Guru is Vedavathi
								<br><br>
								<h5>Member of <span>Organization:</span></h5>
							    Rajeshwari Cultural Association
								<br><br>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-3">
				<div class="side-bar-widget first-widget">
					<!--<h2 class="widget-title text-capitalize"><span>Find A Course </span>&amp; Sign up Today.</h2>-->
					<div class="course-img">
						<img alt="" src="img/teacher/ct-1.jpg">
					</div>					
					<div class="genius-btn gradient-bg text-center text-uppercase ul-li-block bold-font">
						<a href="{{url('/')}}/contact">Enroll Now <i class="fas fa-caret-right"></i></a>
					</div>
				</div>




			</div>
		</div>
	</div>
</section>
@endsection