<?php
// Configura tus credenciales de conexión
$host = "localhost"; // o el host que te da Hostinger
$dbname = "u984662985_URLsCanva";
$username = "u984662985_yotepromociono";
$password = "Nenulita02";

// Conexión
$conn = new mysqli($host, $username, $password, $dbname);

// Verifica conexión
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Consulta
$sql = "SELECT NombreVariable, UrlVariable FROM VariablesCanva";
$result = $conn->query($sql);

// Recolectar variables
$variables = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $variables[$row['NombreVariable']] = $row['UrlVariable'];
    }
}

// Cerrar conexión
$conn->close();

// Encabezados
header("Access-Control-Allow-Origin: *"); // Quitar o ajustar en producción
header("Content-Type: application/json");

// Imprimir como JSON
echo json_encode($variables);
?>
