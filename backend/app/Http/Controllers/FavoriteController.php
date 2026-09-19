<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Service;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favorites = Favorite::where('client_id', $request->user()->id)
            ->with(['service.user', 'service.category'])
            ->get()
            ->pluck('service');

        return response()->json($favorites);
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
        ]);

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
    }
}
