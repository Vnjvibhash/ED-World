<!-- ye sab me rhe ga it is used to have footer an header in all web pages -->
@extends('layouts.app')
@section('content')
<section id="breadcrumb" class="breadcrumb-section relative-position backgroud-style" style="background-image: url({{url('/')}}/public/assets/front/img/banner/About_us.jpg);">
	<div class="blakish-overlay"></div>
	<div class="container">
		<div class="page-breadcrumb-content text-center">
			<div class="page-breadcrumb-title">
				<h2 class="breadcrumb-head black bold"><span>ED-World -</span> <span>Quiz</span></h2>
			</div>
		</div>
	</div>
</section>
<section>
    <iframe 
    allow="microphone;"
    style="border:none;"
    src="{{url('/')}}/public/assets/sorting_technique/graph.py">
</iframe>
</section>


@endsection

