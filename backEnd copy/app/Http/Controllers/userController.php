<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function login(Request $request) {
        try {
            $request->validate([
            'email' => 'email|required',
            'password' => 'required'
            ]);
            $credentials = request(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'status_code' => 500,
                    'message' => 'Unauthorized'
                ]);
            }
            $user = User::where('email', $request->email)->first();
            if ( ! Hash::check($request->password, $user->password, [])) {
                throw new \Exception('Error in Login');
            }
            $userBasicData = $this->getUserId($request->email);
            $tokenResult = $user->createToken('authToken')->plainTextToken;

            return response()->json([
            'status_code' => 200,
            'access_token' => $tokenResult,
            'token_type' => 'Bearer',
            'userName' => $userBasicData[0]->username,
            'userId' => $userBasicData[0]->userId
            ]);
            
        } catch (Exception $error) {
            return response()->json([
            'status_code' => 500,
            'message' => 'Error in Login',
            'error' => $error,
            ]);
        }
    }

    
    public function getUserId ($email) {
        
        $users = DB::table('users')
            ->select('name as username', 'id as userId')
            ->where('email', '=', $email)
            ->get();

        return $users;
    }

    public function signUp (Request $request) {
        
        try {
            $data = request(['data']);
            $hashedPasww = Hash::make($data['data']['password']);
            DB::table('Users')->insert([
                [
                    'email' => $data['data']['email'],
                    'name' => $data['data']['firstName'].' '.$data['data']['lastName'],
                    'password' => $hashedPasww
                ]
            ]);

        } catch (Exception $error) {
            return [
                'error' => $error,
                'success' => false
            ];
        }
        
        return ['success' => true];
    }

}
