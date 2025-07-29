<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;


class TaskController extends Controller
{
    //listar todas las tareas
    public function index(Request $request)
    {
    $query = Task::query();

    // Filtra por nombre
    if ($request->has('search')) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    // Filtra por tareas completadas
    if ($request->has('completed')) {
        $query->where('completed', filter_var($request->completed, FILTER_VALIDATE_BOOLEAN));
    }

    return response()->json($query->get());
    }

    // Crear una nueva tarea
    public function store(Request $request)
    {
    $request->validate([
        'name' => 'required|string|max:255',
        'completed' => 'sometimes|boolean',
    ]);

    $task = Task::create([
        'name' => $request->name,
        'completed' => $request->completed ?? false,
    ]);

    return response()->json($task, 201);
    }

    // Mostrar una tarea específica
    public function show($id)
    {
    $task = Task::find($id);

    if (!$task) {
        return response()->json(['message' => 'Tarea no encontrada'], 404);
    }

    return response()->json($task);
    }


    //Actualizar una tarea existente
    public function update(Request $request, $id)
    {
    $task = Task::find($id);

    if (!$task) {
        return response()->json(['message' => 'Tarea no encontrada'], 404);
    }

    $request->validate([
        'name' => 'sometimes|string|max:255',
        'completed' => 'sometimes|boolean',
    ]);

    $task->update($request->only(['name', 'completed']));

    return response()->json($task);
    }


    //Eliminar una tarea
    public function destroy($id)
    {
    $task = Task::find($id);

    if (!$task) {
        return response()->json(['message' => 'Tarea no encontrada'], 404);
    }

    $task->delete();

    return response()->json(['message' => 'Tarea eliminada correctamente']);
    }

}
