<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use App\Models\User;
use Illuminate\Http\Request;

class MachineController extends Controller
{
    public function create(Request $request) {
        $token = $request->bearerToken();
        $user = User::where('accessToken', $token)->first();

        if (!$token) {
            return response()->json(['message' => 'Invalid Token'], 403);
        }
        if (!$user) {
            return response()->json(['message' => 'Authentication required'], 401);
        }

        $machine = Machine::create([
            'name' => $request->name,
            'description' => $request->description,
            'imageUrl' => $request->imageUrl,
            'motherboardId' => $request->motherboardId,
            'powerSupplyId' => $request->powerSupplyId,
            'processorId' => $request->processorId,
            'ramMemoryId' => $request->ramMemoryId,
            'ramMemoryAmount' => $request->ramMemoryAmount,
            'graphicCardId' => $request->graphicCardId,
            'graphicCardAmount' => $request->graphicCardAmount,
        ]);
       
        return response()->json($machine, 200);
    }

    public function update(Request $request, $id) {
        $token = $request->bearerToken();
        $user = User::where('accessToken', $token)->first();

        if (!$token) {
            return response()->json(['message' => 'Invalid Token'], 403);
        }
        if (!$user) {
            return response()->json(['message' => 'Authentication required'], 401);
        }

        $machine = Machine::find($id);
        
        if (!$machine) {
            return response()->json(['message' => 'machine model not foundo'], 404);
        }

        $imageBase64 = $request->imageBase64;

        if ($imageBase64 ) {
            $image = $request->imageUrl;
        } else {
            $image = $machine->imageUrl;
        }
        
        $machine->id = $request->id;
        $machine->name = $request->name;
        $machine->description = $request->description;
        $machine->imageUrl = $image;
        $machine ->motherboardId =  $request->motherboardId;
        $machine->powerSupplyId = $request->powerSupplyId;
        $machine -> processorId = $request->processorId;
        $machine -> ramMemoryId = $request->ramMemoryId;
        $machine -> ramMemoryAmount = $request->ramMemoryAmount;
        $machine -> graphicCardId  = $request->graphicCardId;
        $machine -> graphicCardAmount  = $request->graphicCardAmount;

        $machine->save();

        return response()->json($machine, 200);
    }

    public function delete(Request $request, $id) {
        $token = $request->bearerToken();
        $user = User::where('accessToken', $token)->first();

        if (!$token) {
            return response()->json(['message' => 'Invalid Token'], 403);
        }
        if (!$user) {
            return response()->json(['message' => 'Authentication required'], 401);
        }

        $machine = Machine::find($id);

        if (!$machine) {
            return response()->json(['message' => 'machine model not foundo'], 404);
        }

        $machine->delete(); //! DELETE PRODUCT
        return response('', 200);
    }

    public function image(Request $request, $id) {
        $token = $request->bearerToken();
        $user = User::where('accessToken', $token)->first();

        if (!$token) {
            return response()->json(['message' => 'Invalid Token'], 403);
        }
        if (!$user) {
            return response()->json(['message' => 'Authentication required'], 401);
        }

        $machine = Machine::find($id);

        if (!$machine) {
            return response()->json(['message' =>  'machine not found'], 404);
        }

        if (!$machine->imageUrl) {
            return response()->json(['message' => 'image not found'], 404);
        }

        return response()->json($machine->imageUrl, 200);
    }
}
