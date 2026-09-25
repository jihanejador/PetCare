<?php

namespace App\Http\Controllers;

use App\Models\Rendezvous;
use Illuminate\Http\Request;

class RendezvousController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'date'       => 'required|date|after_or_equal:today',
            'time'       => 'required',
        ]);

        $rendezvous = Rendezvous::create([
            'client_id'  => $request->user()->id,
            'service_id' => $request->service_id,
            'date'       => $request->date,
            'time'       => $request->time,
            'status'     => 'Pending',
        ]);

        return response()->json([
            'message'    => 'Rendez-vous demandé avec succès',
            'rendezvous' => $rendezvous->load('service')
        ], 201);
    }

    public function proIndex(Request $request)
    {
        $user = $request->user();

        $rendezvous = Rendezvous::whereHas('service', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })
        ->with(['client', 'service'])
        ->orderBy('date', 'asc')
        ->get();

        return response()->json($rendezvous);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Accepted,Rejected,Cancelled,Completed,Pending'
        ]);

        $user = $request->user();

        $rendezvous = Rendezvous::whereHas('service', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->find($id);

        if (!$rendezvous) {
            return response()->json(['message' => 'Rendez-vous non trouvé ou non autorisé.'], 403);
        }

        $rendezvous->update(['status' => $request->status]);

        return response()->json([
            'message'    => 'Statut mis à jour avec succès',
            'rendezvous' => $rendezvous
        ]);
    }

    public function cancel(Request $request, $id)
    {
        $user = $request->user();

        $rendezvous = Rendezvous::where('client_id', $user->id)->find($id);

        if (!$rendezvous) {
            return response()->json(['message' => 'Rendez-vous non trouvé.'], 404);
        }

        if (strtolower($rendezvous->status) !== 'pending') {
            return response()->json(['message' => 'Impossible d\'annuler un rendez-vous déjà traité.'], 400);
        }

        $rendezvous->update(['status' => 'Cancelled']);

        return response()->json([
            'message'    => 'Rendez-vous annulé avec succès.',
            'rendezvous' => $rendezvous
        ]);
    }

    public function clientIndex(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['message' => 'Non authentifié.'], 401);
            }

            $rendezvous = Rendezvous::where('client_id', $user->id)
                ->with(['service.user', 'review'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($rendezvous);
        } catch (\Exception $e) {
            $rendezvous = Rendezvous::where('client_id', $request->user()->id)
                ->with('service')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($rendezvous);
        }
    }

    public function markAsCompleted(Request $request, $id)
    {
        $user = $request->user();

        $rdv = Rendezvous::whereHas('service', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->find($id);

        if (!$rdv) {
            return response()->json(['message' => 'Rendez-vous non trouvé ou non autorisé.'], 403);
        }

        $rdv->status = 'Completed';
        $rdv->save();

        return response()->json([
            'message'    => 'Rendez-vous marqué comme terminé',
            'rendezvous' => $rdv
        ]);
    }
}
