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
<section class="quiz">
<!-- start Quiz button -->
    <div class="quiz_start_btn"><button>Start Quiz</button></div>

    <!-- Info Box -->
    <div class="quiz_info_box">
        <div class="quiz_info-title"><span>Some Rules of this Quiz</span></div>
        <div class="quiz_info-list">
            <div class="quiz_info">1. You will have only <span>15 seconds</span> per each question.</div>
            <div class="quiz_info">2. Once you select your answer, it can't be undone.</div>
            <div class="quiz_info">3. You can't select any option once time goes off.</div>
            <div class="quiz_info">4. You can't exit from the Quiz while you're playing.</div>
            <div class="quiz_info">5. You'll get points on the basis of your correct answers.</div>
        </div>
        <div class="quiz_buttons">
            <button class="quiz_quit">Exit Quiz</button>
            <button class="quiz_restart">Continue</button>
        </div>
    </div>

    <!-- Quiz Box -->
    <div class="quiz_box">
        <header>
            <div class="quiz_title">Awesome Quiz Application</div>
            <div class="quiz_timer">
                <div class="quiz_time_left_txt">Time Left</div>
                <div class="quiz_timer_sec">15</div>
            </div>
            <div class="quiz_time_line"></div>
        </header>
        <section>
            <div class="quiz_que_text">
                <!-- Here I've inserted question from JavaScript -->
            </div>
            <div class="quiz_option_list">
                <!-- Here I've inserted options from JavaScript -->
            </div>
        </section>

        <!-- footer of Quiz Box -->
        <footer>
            <div class="quiz_total_que">
                <!-- Here I've inserted Question Count Number from JavaScript -->
            </div>
            <button class="quiz_next_btn">Next Que</button>
        </footer>
    </div>

    <!-- Result Box -->
    <div class="quiz_result_box">
        <div class="quiz_icon">
            <i class="fas fa-crown"></i>
        </div>
        <div class="quiz_complete_text">You've completed the Quiz!</div>
        <div class="quiz_score_text">
            <!-- Here I've inserted Score Result from JavaScript -->
        </div>
        <div class="quiz_buttons">
            <button class="quiz_restart">Replay Quiz</button>
            <button class="quiz_quit">Quit Quiz</button>
        </div>
    </div>



</section>


@endsection

