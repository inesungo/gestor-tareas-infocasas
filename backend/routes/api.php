<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

// Ruta de prueba opcional
Route::get('/ping', function () {
    return response()->json(['message' => 'pong']);
});

// Rutas para las tareas
Route::apiResource('tasks', TaskController::class);
