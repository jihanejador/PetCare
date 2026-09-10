<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with(['user', 'category'])->latest()->get();
        return response()->json($services);
    }

    public function store(StoreServiceRequest $request)
    {
        $service = $request->user()->services()->create($request->validated());

        return response()->json([
            'message' => 'Service créé avec succès',
            'service' => $service->load('category')
        ], 201);
    }

    public function show(Service $service)
    {
        return response()->json($service->load(['user', 'category']));
    }

    public function update(StoreServiceRequest $request, Service $service)
    {
        if ($service->user_id !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        $service->update($request->validated());

        return response()->json([
            'message' => 'Service mis à jour avec succès',
            'service' => $service->load('category')
        ]);
    }

    public function destroy(Service $service)
    {
        if ($service->user_id !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        $service->delete();

        return response()->json([
            'message' => 'Service supprimé avec succès'
        ]);
    }
}
