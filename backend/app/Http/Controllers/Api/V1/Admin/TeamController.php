<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Team::all();

        return response()->json([
            'data' => $members
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string',
            'post' => 'required|string',
            'description' => 'required|string',
            'linkedin' => 'required|string',
            'instagram' => 'required|string',
        ]);

        if ($request->hasFile('image')) {

            $path = $request->file('image')->store('members', 'public');

            $data['image'] = $path;

        }

        $team = Team::create($data);

        return response()->json([
            'message' => 'Team member created successfuly',
            'data' => $team,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string',
            'post' => 'required|string',
            'description' => 'required|string',
            'linkedin' => 'required|string',
            'instagram' => 'required|string',
        ]);

        $team = Team::findOrFail($id);

        if ($request->hasFile('image')) {
            if($team->image && Storage::disk('public')->exists($team->image)) {
                Storage::disk('public')->delete($team->image);
            }

            $path = $request->file('image')->store('members', 'public');
            $data['image'] = $path;
        }

        $team->update($data);

        return response()->json([
            'message' => 'Team member updated successfully',
            'data' => $team,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $team = Team::findOrFail($id);

        Storage::disk('public')->delete($team->image);

        $team->delete();

        return response()->json([
            'message' => 'Team member deleted successfully',
        ], 200);
    }
}
