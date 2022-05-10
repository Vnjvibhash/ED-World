@extends('layouts.app')
@section('content')
<section id="breadcrumb" class="breadcrumb-section relative-position backgroud-style" style="background-image: url({{url('/')}}/public/assets/front/img/banner/FAQ.jpg);">
	<div class="blakish-overlay"></div>
	<div class="container">
		<div class="page-breadcrumb-content text-center">
			<div class="page-breadcrumb-title">
				<h2 class="breadcrumb-head black bold"><span>ED-World -</span> <span>FAQs</span></h2>
			</div>
		</div>
	</div>
</section>
<section class="faq-page-section" id="faq-page">
	<div class="container">
		<div class="faq-element">
			<div class="row">
				<div class="col-md-12">
					<div class="faq-page-tab">
						<div class="section-title-2 mb65 headline text-left">
							<h2>Find <span>Your Questions &amp; Answers.</span></h2>
						</div>
						<div class="panel-group" id="accordion-2">
							<div class="panel">
								<div class="panel-title" id="headingSix">
									<h3 class="mb-0">
										<button class="btn btn-link" aria-expanded="true" aria-controls="collapseSix" data-toggle="collapse" data-target="#collapseSix">
											What age does my child need to be to take lessons?
										</button>

									</h3>
								</div>
								<div class="collapse show" id="collapseSix" aria-labelledby="headingSix" data-parent="#accordion-2">
									<div class="panel-body">
										<p>The average age to start a child is&nbsp; four to six.The main criteria are that the child knows his/her alphabet and can sit still for 20 minutes.</p>
									</div>
								</div>
							</div>
						</div>
						<div class="panel-group" id="accordion-2">
							<div class="panel">
								<div class="panel-title" id="headingSix">
									<h3 class="mb-0">
										<button class="btn btn-link" aria-expanded="true" aria-controls="collapseSix" data-toggle="collapse" data-target="#collapseSix">
											Can children really learn music virtually?
										</button>
									</h3>
								</div>
								<div class="collapse show" id="collapseSix" aria-labelledby="headingSix" data-parent="#accordion-2">
									<div class="panel-body">
										<p>Yes!&nbsp; Children’s Music teachers use a variety of successful learning strategies that include interactive ZOOM lessons, video tutorials, prompt email replies and online office hours for individual help.</p>
                                        <p>In addition to learning to play a specific instrument, virtual instruction also includes:<br>
                                        • Teaching musical fundamentals including note reading, terminology, music history, etc.<br>
                                        • Incorporating an introduction to each instrument of the orchestra including woodwinds, brass, strings and percussion<br>
                                        • Exploring other modes of music learning including composition, music technology, popular&nbsp;music, world music, etc</p>
									</div>
								</div>
							</div>
						</div>
						<div class="panel-group" id="accordion-2">
							<div class="panel">
								<div class="panel-title" id="headingSix">
									<h3 class="mb-0">
										<button class="btn btn-link" aria-expanded="true" aria-controls="collapseSix" data-toggle="collapse" data-target="#collapseSix">
											If my schedule changes, how difficult will it be to change my lesson time?
										</button>
									</h3>
								</div>
								<div class="collapse show" id="collapseSix" aria-labelledby="headingSix" data-parent="#accordion-2">
									<div class="panel-body">
										<p>Students that are already in the program will have the first choice at new times as they become available.</p>
                                        <p>If your schedule changes, let your instructor know and they will give you top priority in moving if an alternative time is available.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

@endsection
