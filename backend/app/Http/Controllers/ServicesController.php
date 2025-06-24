<?php

namespace App\Http\Controllers;

use App\Models\Models\Service;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function services() {
        $services = Service::all();

        return response()->json([
            'services' => $services
        ], 200);
    }
}
