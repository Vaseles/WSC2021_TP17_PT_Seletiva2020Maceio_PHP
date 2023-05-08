<?php

namespace App\Http\Controllers;

use App\Http\Resources\MotherBoardResource;
use App\Models\Brand;
use App\Models\GraphicCard;
use App\Models\Machine;
use App\Models\Motherboard;
use App\Models\PowerSupply;
use App\Models\Processor;
use App\Models\RamMemory;
use App\Models\StorageDevice;
use App\Models\User;
use Illuminate\Http\Request;

class DetailsController extends Controller
{
    public function all_details(Request $request) {
        $token = $request->bearerToken();
        $user = User::where('accessToken', $token)->first();

        if (!$token) {
            return response()->json(['message' => 'Invalid Token'], 403);
        }
        if (!$user) {
            return response()->json(['message' => 'Authentication required'], 401);
        }

        $motherboards = Motherboard::all();
        $processors = Processor::all();
        $rammemories = RamMemory::all();
        $storagedevices = StorageDevice::all();
        $graphiccards = GraphicCard::all();
        $machines = Machine::all();
        $power_supplies = PowerSupply::all();
        $brands = Brand::all();

        return response()->json([
            'motherboards' => MotherBoardResource::collection($motherboards),
            'processors' => $processors,
            'rammemories' => $rammemories,
            'storagedevices' => $storagedevices,
            'graphiccards' => $graphiccards,
            'machines' => $machines,
            'power_supplies' => $power_supplies,
            'brands' => $brands
        ], 200);
    }

    public function search(Request $request) {
        $token = $request->bearerToken();
        $user = User::where('accessToken', $token)->first();

        if (!$token) {
            return response()->json(['message' => 'Invalid Token'], 403);
        }
        if (!$user) {
            return response()->json(['message' => 'Authentication required'], 401);
        }

       
        return response()->json([
           
        ], 200);
    }
}
