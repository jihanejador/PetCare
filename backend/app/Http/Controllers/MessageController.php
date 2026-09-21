<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function getConversation(Request $request, $otherUserId)
    {
        $authId = $request->user()->id;

        Message::where('sender_id', $otherUserId)
            ->where('receiver_id', $authId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        $messages = Message::where(function ($q) use ($authId, $otherUserId) {
            $q->where('sender_id', $authId)->where('receiver_id', $otherUserId);
        })->orWhere(function ($q) use ($authId, $otherUserId) {
            $q->where('sender_id', $otherUserId)->where('receiver_id', $authId);
        })
        ->orderBy('created_at', 'asc')
        ->get();

        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content'     => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'sender_id'   => $request->user()->id,
            'receiver_id' => $request->receiver_id,
            'content'     => $request->content,
            'is_read'     => false,
        ]);

        return response()->json($message, 201);
    }

    public function getConversations(Request $request)
    {
        $authId = $request->user()->id;

        $userIds = Message::where('sender_id', $authId)
            ->pluck('receiver_id')
            ->merge(
                Message::where('receiver_id', $authId)->pluck('sender_id')
            )
            ->unique()
            ->filter(fn($id) => $id != $authId);

        $users = User::whereIn('id', $userIds)->select('id', 'name', 'role', 'photo')->get();

        $conversations = $users->map(function ($user) use ($authId) {
            $lastMessage = Message::where(function ($q) use ($authId, $user) {
                $q->where('sender_id', $authId)->where('receiver_id', $user->id);
            })->orWhere(function ($q) use ($authId, $user) {
                $q->where('sender_id', $user->id)->where('receiver_id', $authId);
            })
            ->latest()
            ->first();

            $unreadCount = Message::where('sender_id', $user->id)
                ->where('receiver_id', $authId)
                ->where('is_read', false)
                ->count();

            return [
                'user'              => $user,
                'last_message'      => $lastMessage ? $lastMessage->content : '',
                'last_message_time' => $lastMessage ? $lastMessage->created_at : null,
                'unread_count'      => $unreadCount,
            ];
        });

        return response()->json($conversations);
    }

    public function markAsRead(Request $request, $senderId)
    {
        $authId = $request->user()->id;

        Message::where('sender_id', $senderId)
            ->where('receiver_id', $authId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'Messages marqués comme lus']);
    }
}
