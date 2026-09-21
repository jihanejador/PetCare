<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([]);
            }

            $favorites = Favorite::where('client_id', $user->id)
                ->with(['service' => function ($q) {
                    $q->with(['user', 'category']);
                }])
                ->get()
                ->pluck('service')
                ->filter()
                ->values();

            return response()->json($favorites);
        } catch (\Exception $e) {
            return response()->json([]);
        }
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
        ]);

        try {
            $clientId = $request->user()->id;
            $serviceId = $request->service_id;

            $favorite = Favorite::where('client_id', $clientId)
                ->where('service_id', $serviceId)
                ->first();

            if ($favorite) {
                $favorite->delete();
                return response()->json([
                    'message' => 'Service retiré des favoris',
                    'is_favorited' => false,
                ]);
            }

            Favorite::create([
                'client_id'  => $clientId,
                'service_id' => $serviceId,
            ]);

            return response()->json([
                'message' => 'Service ajouté aux favoris',
                'is_favorited' => true,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }
}
