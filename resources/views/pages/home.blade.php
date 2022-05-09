@extends('layouts.app')
@section('content')
<!-- Start of banner section-!> -->
<section id="slider" class="slider-element bgcolor clearfix slide_pad" style="height: auto;background: url('public/assets/front/img/banner/banner.jpg') no-repeat center center / 100% 100%;">
				
	<section id="hero">
		<div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel">
			<div class="carousel-inner" role="listbox">

				<!-- Slide 1 -->
				<div class="carousel-item active">
					<div class="carousel-container">
						<div class="container">
							<div class="row d-flex">
								<div class="col-lg-6 col-md-6" style="text-align: left;">
									<h2 class="animate__animated animate__fadeInDown">Want to Learn Music Online?</h2>
									<h4 class="animate__animated animate__fadeInUp text-white py-3">Full time Online Music Courses conducted by highly Renowned AIR Senior Artists</h4><p class="animate__animated animate__fadeInUp">Vocal | Veena | Violin | Mridangam | Ghatam | Flute | Guitar | Keyboard and More</p>
									<a href="{{url('/')}}/contact" class="btn-get-started animate__animated animate__fadeInUp scrollto mb-3">Enroll Now</a>
								</div>
								<div class="col-lg-6 col-md-6 center">
									<img src="{{url('/')}}/public/assets/front/img/banner/banner-1.jpg" alt="Video" class="animate__animated animate__fadeInDown">
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Slide 2 -->
				<div class="carousel-item">
					<div class="carousel-container">
						<div class="container">
							<div class="row d-flex">
								<div class="col-lg-6 col-md-6" style="text-align: left;">
									<h2 class="animate__animated animate__fadeInDown"><br>
										Learn Dance online at the comfort from your home from highly talented senior artists</h2>
									<ul class="animate__animated animate__fadeInUp text-white">
										<li>Bharathnatyam</li>
										<li>Kuchipudi</li>
										<li>Kathak</li>
										<li>Mohiniattam</li>
										<li>Bollywood Dance</li>
										<li>Others</li>
									</ul>
									<a href="{{url('/')}}/contact" class="btn-get-started animate__animated animate__fadeInUp scrollto mb-3">Enroll Now</a>
								</div>
								<div class="col-lg-6 col-md-6 center">
									<img src="{{url('/')}}/public/assets/front/img/banner/banner-2.jpg" alt="Video" class="animate__animated animate__fadeInDown">
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Slide 3 -->
				<div class="carousel-item">
					<div class="carousel-container">
						<div class="container">
							<div class="row d-flex">
								<div class="col-lg-6 col-md-6" style="text-align: left;">
									<h2 class="animate__animated animate__fadeInDown">* Rare Vocal Carnatic Self-Study Courses conducted</h2>
									<h2 class="animate__animated animate__fadeInUp">* Special Coaching provided to take all levels of Carnatic Music Exams - Government/ Private</h2>
									<a href="{{url('/')}}/contact" class="btn-get-started animate__animated animate__fadeInUp scrollto mb-3">Enroll Now</a>
								</div>
								<div class="col-lg-6 col-md-6 center">
									<img src="{{url('/')}}/public/assets/front/img/banner/banner-3.jpg" alt="Video" class="animate__animated animate__fadeInDown">
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Slide 4 -->
				<div class="carousel-item">
					<div class="carousel-container">
						<div class="container">
							<div class="row d-flex">
								<div class="col-lg-6 col-md-6" style="text-align: left;">
									<h2 class="animate__animated animate__fadeInDown">Turn Your Dream into Career.<br>
										Get trained by Highly experienced and certified professionals for</h2>
									<ul class="animate__animated animate__fadeInUp text-white"><li>Sound Engineering</li>
										<li>Audio Engineering</li>
										<li>Sound Production</li>
										<li>Orchestration</li>
										<li>Film scoring</li>
									</ul>
									<a href="{{url('/')}}/contact" class="btn-get-started animate__animated animate__fadeInUp scrollto mb-3">Enroll Now</a>
								</div>
								<div class="col-lg-6 col-md-6 center">
									<img src="{{url('/')}}/public/assets/front/img/banner/banner-4.jpg" alt="Video" class="animate__animated animate__fadeInDown">
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Slide 5 -->
				<div class="carousel-item">
					<div class="carousel-container">
						<div class="container">
							<div class="row d-flex">
								<div class="col-lg-6 col-md-6" style="text-align: left;">
									<h2 class="animate__animated animate__fadeInDown">"DISABILITY IS NOT INABILITY":</h2>
									<p class="animate__animated animate__fadeInUp">Breaking down stigma and help children and Adults to sing and play music from specially trained certified Teachers</p>
									<a href="{{url('/')}}/contact" class="btn-get-started animate__animated animate__fadeInUp scrollto mb-3">Enroll Now</a>
								</div>
								<div class="col-lg-6 col-md-6 center">
									<img src="{{url('/')}}/public/assets/front/img/banner/banner-5.jpg" alt="Video" class="animate__animated animate__fadeInDown">
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		<a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
			<span class="carousel-control-prev-icon icofont-simple-left" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>

		<a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
			<span class="carousel-control-next-icon icofont-simple-right" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>

		</div>
	</section>
			

			

</section>
<!-- banner-end -->
<div class="container">
	<div class="course-teacher">
		<div class="course-advantage">
			<div class="section-title-2 headline text-left">
				<h2>How It <span>Works</span></h2>
			</div>
			<div class="service-slide_3">
				<div class="service-text-icon">
					<div class="service-icon float-left">
						<i class="text-gradiant flaticon-graduation-hat"></i>
					</div>
					<div class="service-text">
						<h3 class="bold-font">Find A Developper.</h3>
						<p>We work to provide the best developers for your enrichment. Get in touch by logging into our website.</p>
					</div>
				</div>
				<div class="service-text-icon">
					<div class="service-icon float-left">
						<i class="text-gradiant flaticon-clipboard-with-pencil"></i>
					</div>
					<div class="service-text">
						<h3 class="bold-font">Practice your coading skills</h3>
						<p>The next step is to schedule a class with your selected teacher. Get your routine dedicated to music class.</p>
					</div>
				</div>
				<div class="service-text-icon">
					<div class="service-icon float-left">
						<i class="text-gradiant flaticon-technology"></i>
					</div>
					<div class="service-text">
						<h3 class="bold-font">Join The Community.</h3>
						<p>Meet your teacher in those scheduled hours and enjoy learning music.</p>
					</div>
				</div>
				<div class="service-text-icon">
					<div class="service-icon float-left">
						<i class="text-gradiant flaticon-technology-1"></i>
					</div>
					<div class="service-text">
						<h3 class="bold-font">Generate you QR</h3>
						<p>After completing the course, we provide a certificate that holds value in the market.</p>
					</div>
				</div>

			</div>
		</div>
		<!-- /course-advantage -->
		<div class="teacher-details-content mb45 mt-5">
			<div class="section-title-2  headline text-left pt-5">
				<h2>Sing in 4 Membership. <span>Beginner's Can go through with our website.</span></h2>
				<!--<div class="teacher-deg">
					Specialities: <span></span> 
				</div>-->
			</div>
			<div class="row">
				<div class="col-md-4">
					<div class="teacher-details-img mt-5">
						<img src="{{url('/')}}/public/assets/front/img/relax.png" alt="" />
					</div>
				</div>
				<div class="col-md-8 pt-5">
					<div class="teacher-details-text">
						<!--<div class="section-title-2  headline text-left pt-5">
							<h2>Learn to Sing in <span>4 classes.</span></h2>
							<div class="teacher-deg">
								Specialities: <span>Beginner's course/Summer Camp</span> 
							</div>
						</div>-->
						<div class="teacher-address">
							<div class="address-details">
								<!--<ul>
									<li>1: Introduction to Music and Spataswaras</li>
									<li>2: Proficiency in 8 keertanai/Songs</li>
									<li>3: Master in five different Slokas</li>
									<li>4: Recordings and assignments provided</li>
									<li>5: A Course Completion Certificate</li>													
								</ul>-->
								<div class="category-item">
									<div class="row">
										<div class="col-md-2">
											<div class="category-icon-title text-center px-2 pb-0">
												<div class="category-icon">
													<i class="text-gradiant flaticon-technology-1"></i>
												</div>
												<div class="category-title pb-4">
													<h4 style="font-size: 15px;">Introduction to Music and Saptaswaras</h4>
												</div>
											</div>
										</div>
										<!-- /category -->

										<div class="col-md-2">
											<div class="category-icon-title text-center px-1 pb-0">
												<div class="category-icon">
													<i class="text-gradiant flaticon-app-store"></i>
												</div>
												<div class="category-title pb-4">
													<h4 style="font-size: 15px;">Proficiency in 8 keertanai / Songs</h4>
												</div>
											</div>
										</div>
										<!-- /category -->

										<div class="col-md-2">
											<div class="category-icon-title text-center px-2 pb-0">
												<div class="category-icon">
													<i class="text-gradiant flaticon-book"></i>
												</div>
												<div class="category-title pb-4">
													<h4 style="font-size: 15px;">Master in five different Slokas</h4>
												</div>
											</div>
										</div>
										<!-- /category -->

										<div class="col-md-2">
											<div class="category-icon-title text-center px-1 pb-0">
												<div class="category-icon">
													<i class="text-gradiant flaticon-business"></i>
												</div>
												<div class="category-title pb-4">
													<h4 style="font-size: 15px;">Recordings &amp; assignments provided</h4>
												</div>
											</div>
										</div>
										<!-- /category -->

										<div class="col-md-2">
											<div class="category-icon-title text-center px-3 pb-0">
												<div class="category-icon">
													<i class="text-gradiant flaticon-clipboard-with-pencil"></i>
												</div>
												<div class="category-title pb-4">
													<h4 style="font-size: 15px;">A Course Completion Certificate</h4>
												</div>
											</div>
										</div>
										<!-- /category -->
									</div>
									<!--<div class="genius-btn gradient-bg text-center text-uppercase ul-li-block bold-font" style="float: left;background: #08B3EF;"><a href="{{url('/')}}/student-register">Enroll Now <i class="fas fa-caret-right"></i></a></div>-->
									<div class="genius-btn gradient-bg text-center text-uppercase ul-li-block bold-font ml-3" style="float: left;"><a href="{{url('/')}}/contact">Request Details <i class="fas fa-caret-right"></i></a></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- /course-categori -->
	</div>
</div>

<section id="teacher-2" class="secound-teacher-section py-5">
	<div class="container">
		<div class="section-title mb35 headline text-left">
			<span class="subtitle ml42  text-uppercase">Vocal, Instrumental and Dance</span>
			<h2>Search Our Website <span>Features</span></h2>
		</div>
		<div class="best-course-area mb45">
			<div class="row">
				<div class="col-md-2">
					<div class="best-course-pic-text relative-position ">
						<div class="best-course-pic relative-position">
							<img src="{{url('/')}}/public/assets/images/products/60b0fec28f37c.jpg" style="height: 220px;width:270px;" alt="">
							<div class="trend-badge-2 text-center text-uppercase">
								<i class="fas fa-bolt"></i>
								<span>Trending</span>
							</div>
							<div class="course-rate ul-li">
								<ul>
									<li>Click</li>
								</ul>
							</div>
							<div class="course-details-btn">
								<a href="{{url('/')}}/workshop-details/1">SELF-STTUDY COURSES DETAIL<i class="fas fa-arrow-right"></i></a>
							</div>
							<div class="blakish-overlay"></div>
						</div>
						<div class="best-course-text">
							<div class="course-title mb20 headline relative-position">
								<h3><a href="{{url('/')}}/workshop-details/1">Purandaradasar Compositions</a></h3>
							</div>
						</div>
					</div>
				</div>
				<!-- /course -->
				<div class="col-md-2">
					<div class="best-course-pic-text relative-position ">
						<div class="best-course-pic relative-position">
							<img src="{{url('/')}}/public/assets/images/products/1621254058_Muthuswami-DikshitarArt.jpg" style="height: 220px;width:270px;" alt="">
							<div class="trend-badge-2 text-center text-uppercase">
								<i class="fas fa-bolt"></i>
								<span>Trending</span>
							</div>
							<div class="course-rate ul-li">
								<ul>
									<li>Click</li>
								</ul>
							</div>
							<div class="course-details-btn">
								<a href="{{url('/')}}/workshop-details/2">SELF-STTUDY COURSES DETAIL<i class="fas fa-arrow-right"></i></a>
							</div>
							<div class="blakish-overlay"></div>
						</div>
						<div class="best-course-text">
							<div class="course-title mb20 headline relative-position">
								<h3><a href="{{url('/')}}/workshop-details/2">Muthuswami Dikshitar Notuswaram</a></h3>
							</div>
						</div>
					</div>
				</div>
				<!-- /course -->
				<div class="col-md-2">
					<div class="best-course-pic-text relative-position ">
						<div class="best-course-pic relative-position">
							<img src="{{url('/')}}/public/assets/images/products/1621254845_saint-thyagaraja.jpg" style="height: 220px;width:270px;" alt="">
							<div class="trend-badge-2 text-center text-uppercase">
								<i class="fas fa-bolt"></i>
								<span>Trending</span>
							</div>
							<div class="course-rate ul-li">
								<ul>
									<li>Click</li>
								</ul>
							</div>
							<div class="course-details-btn">
								<a href="{{url('/')}}/workshop-details/6">SELF-STTUDY COURSES DETAIL<i class="fas fa-arrow-right"></i></a>
							</div>
							<div class="blakish-overlay"></div>
						</div>
						<div class="best-course-text">
							<div class="course-title mb20 headline relative-position">
								<h3><a href="{{url('/')}}/workshop-details/6">Thyagaraajar Compositions</a></h3>
							</div>
						</div>
					</div>
				</div>
				<!-- /course -->
				<div class="col-md-2">
					<div class="best-course-pic-text relative-position ">
						<div class="best-course-pic relative-position">
							<img src="{{url('/')}}/public/assets/images/products/1621255181_Devi Kritis.jpg" style="height: 220px;width:270px;" alt="">
							<div class="trend-badge-2 text-center text-uppercase">
								<i class="fas fa-bolt"></i>
								<span>Trending</span>
							</div>
							<div class="course-rate ul-li">
								<ul>
									<li>Click</li>
								</ul>
							</div>
							<div class="course-details-btn">
								<a href="{{url('/')}}/workshop-details/7">SELF-STTUDY COURSES DETAIL<i class="fas fa-arrow-right"></i></a>
							</div>
							<div class="blakish-overlay"></div>
						</div>
						<div class="best-course-text">
							<div class="course-title mb20 headline relative-position">
								<h3><a href="{{url('/')}}/workshop-details/7">Devi Kritis</a></h3>
							</div>
						</div>
					</div>
				</div>
				<!-- /course -->
				<div class="col-md-2">
					<div class="best-course-pic-text relative-position ">
						<div class="best-course-pic relative-position">
							<img src="{{url('/')}}/public/assets/images/products/1622178611_bharathiyar.jpg" style="height: 220px;width:270px;" alt="">
							<div class="trend-badge-2 text-center text-uppercase">
								<i class="fas fa-bolt"></i>
								<span>Trending</span>
							</div>
							<div class="course-rate ul-li">
								<ul>
									<li>Click</li>
								</ul>
							</div>
							<div class="course-details-btn">
								<a href="{{url('/')}}/workshop-details/14">SELF-STTUDY COURSES DETAIL<i class="fas fa-arrow-right"></i></a>
							</div>
							<div class="blakish-overlay"></div>
						</div>
						<div class="best-course-text">
							<div class="course-title mb20 headline relative-position">
								<h3><a href="{{url('/')}}/workshop-details/14">Bharathiyaar songs</a></h3>
							</div>
						</div>
					</div>
				</div>
				<!-- /course -->
				<div class="col-md-2">
					<div class="best-course-pic-text relative-position ">
						<div class="best-course-pic relative-position">
							<img src="{{url('/')}}/public/assets/images/products/60b105aba56c1.jpg" style="height: 220px;width:270px;" alt="">
							<div class="trend-badge-2 text-center text-uppercase">
								<i class="fas fa-bolt"></i>
								<span>Trending</span>
							</div>
							<div class="course-rate ul-li">
								<ul>
									<li>Click</li>
								</ul>
							</div>
							<div class="course-details-btn">
								<a href="{{url('/')}}/workshop-details/25">SELF-STTUDY COURSES DETAIL<i class="fas fa-arrow-right"></i></a>
							</div>
							<div class="blakish-overlay"></div>
						</div>
						<div class="best-course-text">
							<div class="course-title mb20 headline relative-position">
								<h3><a href="{{url('/')}}/workshop-details/25">Thirupugazh</a></h3>
							</div>
						</div>
					</div>
				</div>
				<!-- /course -->
			</div>
			<div class="genius-btn gradient-bg text-center text-uppercase ul-li-block bold-font" style="margin: 0px auto;">
				<a href="{{url('/')}}/workshop">All Self-Study Courses<i class="fas fa-caret-right"></i></a>
			</div>
		</div>
	</div>
</section>


<!-- Start of course teacher
		============================================= -->
<section id="course-teacher" class="course-teacher-section">
	<div class="jarallax py-5">
		<div class="container">
			<div class="section-title mb20 headline text-center ">
				<span class="subtitle text-uppercase">OUR PROFESSIONAL</span>
				<h2>Most Privileged <span>Team Members</span></h2>
			</div>

			<div class="teacher-list">
				<div class="row justify-content-center">
					<div class="col-md-3">
						<div class="teacher-img-content ">
							<div class="teacher-cntent">
								<div class="teacher-social-name text-center ul-li-block">
									<div class="teacher-name">
										<span>Vivek Kumar</span>
									</div>
									<ul>
										<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="#"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#"><i class="fab fa-instagram"></i></a></li>
										{{-- <li><a href="#"><i class="fab fa-whatsapp"></i></a></li> --}}
									</ul>
								</div>
								<div class="teacher-img-category">
									<div class="teacher-img">
										<img src="{{url('/')}}/public/assets/images/profile/sabmohmayahai.jpg" alt="" width="200px">
										<div class="course-price text-uppercase text-center gradient-bg">
											<a href="{{url('/')}}/teacher-details/3"><span>Click</span></a>
										</div>
									</div>
									<div class="teacher-category float-right">
										<span class="st-name">Full-Sack Developper</span>,
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="teacher-img-content ">
							<div class="teacher-cntent">
								<div class="teacher-social-name ul-li-block">
									<div class="teacher-name">
										<span>ShivKant Kumar</span>
									</div>
									<ul>
										<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="#"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#"><i class="fab fa-instagram"></i></a></li>
										{{-- <li><a href="#"><i class="fab fa-whatsapp"></i></a></li> --}}
									</ul>
								</div>
								<div class="teacher-img-category">
									<div class="teacher-img">
										<img src="{{url('/')}}/public/assets/images/profile/sabmohmayahai.jpg" alt="" width="200px">
										<div class="course-price text-uppercase text-center gradient-bg">
											<a href="{{url('/')}}/teacher-details/3"><span>Click</span></a>
										</div>
									</div>
									<div class="teacher-category float-right">
										<span class="st-name">Front-End Developper</span>,
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="teacher-img-content ">
							<div class="teacher-cntent">
								<div class="teacher-social-name ul-li-block">
									<div class="teacher-name">
										<span>Sagar Saini</span>
									</div>
									<ul>
										<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="#"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#"><i class="fab fa-instagram"></i></a></li>
										{{-- <li><a href="#"><i class="fab fa-whatsapp"></i></a></li> --}}
									</ul>
								</div>
								<div class="teacher-img-category">
									<div class="teacher-img">
										<img src="{{url('/')}}/public/assets/images/profile/sabmohmayahai.jpg" alt="" width="200px">
										<div class="course-price text-uppercase text-center gradient-bg">
											<a href="{{url('/')}}/teacher-details/3"><span>Click</span></a>
										</div>
									</div>
									<div class="teacher-category float-right">
										<span class="st-name">AI Developper</span>,
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="teacher-img-content ">
							<div class="teacher-cntent">
								<div class="teacher-social-name ul-li-block">
									<div class="teacher-name">
										<span>Versha Kumari</span>
									</div>
									<ul>
										<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="#"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#"><i class="fab fa-instagram"></i></a></li>
										{{-- <li><a href="#"><i class="fab fa-whatsapp"></i></a></li> --}}
									</ul>
								</div>
								<div class="teacher-img-category">
									<div class="teacher-img">
										<img src="{{url('/')}}/public/assets/images/profile/sabmohmayahai.jpg" alt="" width="200px">
										<div class="course-price text-uppercase text-center gradient-bg">
											<a href="{{url('/')}}/teacher-details/3"><span>Click</span></a>
										</div>
									</div>
									<div class="teacher-category float-right">
										<span class="st-name">Content Writter</span>,
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="teacher-img-content ">
							<div class="teacher-cntent">
								<div class="teacher-social-name ul-li-block">
									<div class="teacher-name">
										<span>Sunidhi Thakur</span>
									</div>
									<ul>
										<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="#"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#"><i class="fab fa-instagram"></i></a></li>
										{{-- <li><a href="#"><i class="fab fa-whatsapp"></i></a></li> --}}
									</ul>
								</div>
								<div class="teacher-img-category">
									<div class="teacher-img">
										<img src="{{url('/')}}/public/assets/images/profile/sabmohmayahai.jpg" alt="" width="200px">
										<div class="course-price text-uppercase text-center gradient-bg">
											<a href="{{url('/')}}/teacher-details/3"><span>Click</span></a>
										</div>
									</div>
									<div class="teacher-category float-right">
										<span class="st-name">Content Writter</span>,
									</div>
								</div>
							</div>
						</div>
					</div>
				<!-- /developer -->
				</div>

				<div class="genius-btn gradient-bg text-center text-uppercase ul-li-block bold-font">
					<a href="{{url('/')}}/teachers">All Developers <i class="fas fa-caret-right" id="exam"></i></a>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- End of course teacher
		============================================= -->
<section id="search-course-2" class="search-course-section backgroud-style py-5">
	<div class="container">


		<div class="search-app">
			<div class="row">
				<div class="col-md-6">
					<div class="app-mock-up">
						<img src="{{url('/')}}/public/assets/front/img/ab-2.png" alt="">
					</div>
				</div>

				<div class="col-md-6">
					<div class="about-us-text search-app-content">
						<div class="section-title relative-position mb20 headline text-left">
							<h2><span>Exams &amp; </span>Certifications </h2>
						</div>

						<div class="app-details-content">
							<p>Graded exams serve as 'the prescribed criteria' for providing a basic understanding to anlayze the progress of a music learner. It helps to test your abilities and scrutinize your skills systematically.</p>

							<div class="about-list mb30 ul-li-block">
								<ul>
									<li>Akhila Bharathiya Gandharva University</li>
									<li>Indian statewise Government Music Exams</li>
									<li>Trinity College of London</li>
									<li>London College of Music (LCM)</li>
									<li>MedhaKshetra </li>
									<li>Bridge Academy</li>
									<li>Rock School</li>
									<li>ABRSM, London</li>
								</ul>
							</div>
							<div class="about-btn">
								<div class="genius-btn gradient-bg text-center text-uppercase ul-li-block bold-font">
									<a href="{{url('/')}}/contact">APPLY NOW <i class="fas fa-caret-right"></i></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


<section id="testimonial_2" class="testimonial_2_section">
	<div class="container">
		<div class="testimonial-slide">
			<div class="section-title-2 mb65 headline text-left">
				<h2>Our <span>Best Students Feedback.</span></h2>
			</div>
            
			<div id="testimonial-slide-item" class="testimonial-slide-area">
				 				<div class="student-qoute">
					
					<p><p>A big thanks to <strong>Shrimati </strong>ma&rsquo;am for being our son&rsquo;s first music teacher, firsts are always special. She has gone out of her way to get to know our son so that when he is learning music from her, he enjoys it completely. &nbsp;She is a gifted singer but also highly skilled at teaching. The best part about her is she is open to suggestions and is so positive in her approach. Although the sessions are happening online, she has never made that a shortcoming. She has used the technology to stay connected all the times by sending recorded music pieces so that they can be a guide and reference to our son every time he practices. As a family, we are a big fan of her!!! <strong>The same goes for Musicintuit Academy, they are committed, highly receptive and deliver whatever promised on time. So a big thanks and I highly recommend Shrimati ma&rsquo;am and Musicintuit Academy!</strong></p></p>
					<div class="student-name-designation">
						<span class="st-name bold-font"></span>
					</div>
					
				</div>
			 				<div class="student-qoute">
					
					<p><p>&quot;<strong>Music Intuit has been till now wonderful for our daughter, she is having online classes through them for vocal, keyboard and dance! We as parents loved the personal care from Vasanthi mam for our daughter in ensuring she really enjoys and learns from the classes. We wish Music Intuit academy and Vasanthi mam reach further heights!&quot;</strong></p></p>
					<div class="student-name-designation">
						<span class="st-name bold-font"></span>
					</div>
					
				</div>
			                
				<!-- <div class="student-qoute">
					<p>“This was our first time lorem ipsum and we <b> were very pleased with the whole experience</b>. Your price was lower than other companies. Our experience was good from start to finish, so we’ll be back in the future lorem ipsum diamet.”</p>
					<div class="student-name-designation">
						<span class="st-name bold-font">Robertho Garcia </span>
						<span class="st-designation">Graphic Designer</span>
					</div>
				</div> -->

				<!-- <div class="student-qoute">
					<p>“This was our first time lorem ipsum and we <b> were very pleased with the whole experience</b>. Your price was lower than other companies. Our experience was good from start to finish, so we’ll be back in the future lorem ipsum diamet.”</p>
					<div class="student-name-designation">
						<span class="st-name bold-font">Robertho Garcia </span>
						<span class="st-designation">Graphic Designer</span>
					</div>
				</div> -->

				<!-- <div class="student-qoute">
					<p>“This was our first time lorem ipsum and we <b> were very pleased with the whole experience</b>. Your price was lower than other companies. Our experience was good from start to finish, so we’ll be back in the future lorem ipsum diamet.”</p>
					<div class="student-name-designation">
						<span class="st-name bold-font">Robertho Garcia </span>
						<span class="st-designation">Graphic Designer</span>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</section>
@endsection