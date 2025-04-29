<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function firstLevel(){
        return view('Home.index');
    }

    public function store(Request $request)
    {
        $survey = Survey::create([
            'level' => $request->input('level'),
        ]);
    
        foreach ($request->input('responses') as $item) {
            // Check if question already exists (optional — if you reuse questions)
            $question = SurveyQuestion::firstOrCreate([
                'question' => $item['question'],
            ]);
    
            SurveyAnswer::create([
                'survey_id' => $survey->id,
                'survey_question_id' => $question->id,
                'answer' => $item['answer'],
            ]);
        }
    
        return response()->json(['message' => 'Survey saved successfully']);
    }
    
}
