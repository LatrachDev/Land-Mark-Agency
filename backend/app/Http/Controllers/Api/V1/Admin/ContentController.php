<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contents = Content::all();

        return response()->json([
            'data' => $contents
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
            'video' => 'required|file|mimes:mp4,mov|max:102400',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'title' => 'required|string',
            'views' => 'required|string|max:10',
        ]);

        if ($request->hasFile('video')) {
            
            $path = $request->file('video')->store('contents/videos', 'public');

            $data['video'] = $path;

        }

        if ($request->hasFile('thumbnail')) {
            
            $path = $request->file('thumbnail')->store('contents/thumbnails', 'public');

            $data['thumbnail'] = $path;

        }

        $reel = Content::create($data);

        return response()->json([
            'message' => 'Reel created successfuly',
            'data' => $reel,
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
            'video' => 'nullable|file|mimes:mp4,mov|max:102400',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'title' => 'required|string',
            'views' => 'required|string|max:10',
        ]);

        $reel = Content::findOrFail($id);

        if ($request->hasFile('video')) {

            if ($reel->video) {
                Storage::disk('public')->delete($reel->video);
            }

            $data['video'] = $request->file('video')->store('contents/videos', 'public');
        }

        if ($request->hasFile('thumbnail')) {
        
            if ($reel->thumbnail) {
                Storage::disk('public')->delete($reel->thumbnail);
            }

            $data['thumbnail'] = $request->file('thumbnail')->store('contents/thumbnails', 'public');
        }

        $reel->update($data);

        return response()->json([
            'message' => 'Reel updated successfully',
            'data' => $reel,
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reel = Content::findOrFail($id);

        Storage::disk('public')->delete($reel->video);
        Storage::disk('public')->delete($reel->thumbnail);

        $reel->delete();

        return response()->json([
            'message' => 'Reel deleted successfuly',
        ], 200);
    }
}
