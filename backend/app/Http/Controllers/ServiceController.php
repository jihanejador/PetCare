<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::with(['user', 'category'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($u) use ($search) {
                      $u->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('city')) {
            $city = $request->city;
            $query->whereHas('user', function ($q) use ($city) {
                $q->where('city', 'like', "%{$city}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $services = $query->latest()->paginate(9);

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
