<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function showProProfile($id)
    {
        $pro = User::where('role', 'pro')
            ->with(['services.category', 'reviews.client'])
            ->withAvg('reviews', 'rating')
            ->findOrFail($id);

        return response()->json([
            'id' => $pro->id,
            'name' => $pro->name,
            'avatar' => $pro->avatar,
            'specialty' => $pro->specialty,
            'city' => $pro->city,
            'description' => $pro->description,
            'rating_avg' => round($pro->reviews_avg_rating, 1) ?? 0,
            'services' => $pro->services,
            'reviews' => $pro->reviews,
        ]);
    }
}
