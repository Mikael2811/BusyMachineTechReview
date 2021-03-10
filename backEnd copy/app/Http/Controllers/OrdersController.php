<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Hash;

class OrdersController extends Controller
{
    public function getOrdersByUserID (Request $request) {
        $userID = request(['userID']);
        if($userID) {
            try {
                $mySqlQuery = 
                "
                    SELECT 
                        ord.OrderID,
                        pr.productName as orderedProducts,
                        ord.orderDate,
                        us.name as orderBy
                    FROM Orders ord
                    INNER JOIN Users us ON us.id = ord.userID
                    INNER JOIN OrderItems ordI ON ord.orderID = ordI.orderID
                    INNER JOIN Products pr ON pr.productID = ordI.productID AND us.id = pr.userID
                    WHERE ord.userID = ". $userID['userID'];
                $response = DB::select($mySqlQuery);
                
                return $response;
            } catch (Exception $error) {
                return [
                    'error' => $error,
                    'success' => false
                ];
            }
        }
    }
}
