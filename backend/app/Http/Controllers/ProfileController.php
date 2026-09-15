<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'phone'       => 'nullable|string|max:20',
            'city'        => 'nullable|string|max:100',
            'address'     => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'specialty'   => 'nullable|string|max:255',
            'photo'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'avatar'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $user->photo = $request->file('photo')->store('avatars', 'public');
        } elseif ($request->hasFile('avatar')) {
            $user->photo = $request->file('avatar')->store('avatars', 'public');
        }

        if ($request->has('name')) $user->name = $request->input('name');
        if ($request->has('phone')) $user->phone = $request->input('phone');
        if ($request->has('city')) $user->city = $request->input('city');
        if ($request->has('address')) $user->address = $request->input('address');
        if ($request->has('description')) $user->description = $request->input('description');
        if ($request->has('specialty')) $user->specialty = $request->input('specialty');

        $user->save();

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user'    => $user->fresh()
        ]);
    }
}
