<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Rendezvous;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'service_id'    => 'required|exists:services,id',
            'rendezvous_id' => 'required|exists:rendezvous,id',
            'rating'        => 'required|integer|min:1|max:5',
            'comment'       => 'nullable|string|max:500',
        ]);

        $user = $request->user();
        $rdv = Rendezvous::findOrFail($request->rendezvous_id);

        if ($rdv->client_id !== $user->id) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        if ($rdv->service_id != $request->service_id) {
            return response()->json(['message' => 'Service non correspondant au rendez-vous.'], 400);
        }

        if (strtolower($rdv->status) !== 'completed') {
            return response()->json(['message' => 'Vous ne pouvez évaluer que les services terminés.'], 400);
        }

        $alreadyReviewed = Review::where('client_id', $user->id)
            ->where('rendezvous_id', $request->rendezvous_id)
            ->exists();

        if ($alreadyReviewed) {
            return response()->json(['message' => 'Vous avez déjà évalué ce rendez-vous.'], 400);
        }

        $review = Review::create([
            'client_id'     => $user->id,
            'service_id'    => $request->service_id,
            'rendezvous_id' => $request->rendezvous_id,
            'rating'        => $request->rating,
            'comment'       => $request->comment,
        ]);

        return response()->json([
            'message' => 'Avis ajouté avec succès !',
            'review'  => $review->load('client:id,name,photo,avatar')
        ], 201);
    }

    public function getServiceReviews($serviceId)
    {
        $reviews = Review::where('service_id', $serviceId)
            ->with('client:id,name,photo,avatar')
            ->orderBy('created_at', 'desc')
            ->get();

        $avgRating = $reviews->avg('rating') ? round($reviews->avg('rating'), 1) : 0;
        $totalReviews = $reviews->count();

        return response()->json([
            'reviews'       => $reviews,
            'avg_rating'    => $avgRating,
            'total_reviews' => $totalReviews,
        ]);
    }
}
