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

    public function show(string $id)
    {
        $service  = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return response()->json($service);
    }
}
