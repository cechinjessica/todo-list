<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    private $task;

    public function __construct(Task $task){
        $this->task = $task;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        return Task::whereUserId(auth()->user()->id)->orderBy('updated_at', 'desc')->get();
        //return $this->task->paginate(20);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $task = new Task();
        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->status = $request->input('status');
        $task->user_id = auth()->user()->id;

        return $task->save();
        //return $this->task->create($task->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        // $user = auth()->user();
         
        // return $user->id;
        return $task; //->with('usuario')->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        $task->title = $request->input('title');
        $task->description = $request->input('description');
        //$task->user_id = $request->input('user_id');
        $task->status = $request->input('status');
        $task->user_id = auth()->user()->id;
        $task->update();

        return $task;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        return $task->delete();
    }
}
