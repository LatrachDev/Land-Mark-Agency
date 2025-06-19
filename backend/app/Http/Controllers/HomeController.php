<?php

namespace App\Http\Controllers;

use App\Models\Models\Blog;
use App\Models\Models\Content;
use App\Models\Models\Project;
use App\Models\Models\Team;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home()
    {
        $threeProjects = Project::latest()->take(3)->get();
        $threeContents = Content::latest()->take(3)->get();
        $blogs = Blog::all();

        return response()->json([
            'threeProjects' => $threeProjects,
            'threeContents' => $threeContents,
            'blogs' => $blogs
        ], 200);
    }

    public function porftolio() 
    {

        $allProjects = Project::all();
        $contents = Content::all();

        return response()->json([
            'allProjects' => $allProjects,
            'contents' => $contents
        ], 200);

    }
    
    public function teamMembers()
    {
        $teamMembers = Team::all();

        return response()->json([
            'teamMembers' => $teamMembers
        ], 200);
    }

    public function blog()
    {
        $marketingBlogs = Blog::where('category', 'MARKETING')->get();
        $brandingBlogs = Blog::where('category', 'BRANDING')->get();
        $contentsBlogs = Blog::where('category', 'CONTENTS')->get();

        return response()->json([
            'marketingBlogs' => $marketingBlogs,
            'brandingBlogs' => $brandingBlogs,
            'contentsBlogs' => $contentsBlogs
        ], 200);
    }
}
