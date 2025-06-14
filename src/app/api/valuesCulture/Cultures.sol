// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Cultures {
     // Errores personalizados
    error CulturaFueraDeRango(uint8 cultura);
    error MontoIncorrecto(uint256 enviado, uint256 requerido);
    error ErroronlyOwner();

    struct Culturas {
        string cultura1;
        string cultura2;
    }

    string[15] private nombresCulturas = [
        "German Switzerland", "USA", "Arab", "Brazil", "United Kingdom",
        "China", "Germany", "France", "India", "Indonesia",
        "Korea", "Malaysia", "Mexico", "Netherlands", "Russia"
    ];

    mapping(address => Culturas) public s_selecciones;

    // (Opcional) Retiro por parte del dueño
    address public immutable i_owner;
    modifier onlyOwner() {
        if(msg.sender != i_owner) revert ErroronlyOwner();
        _;
    }
    
    constructor() {
        i_owner = msg.sender;
    }

    event CulturasSeleccionadas(address indexed usuario, string indexed cultura1, string indexed cultura2);

    // Ahora la función es payable
    function pickCultures(uint8 _culture1, uint8 _culture2) external payable {
        if (msg.value < 0.01 ether) {
            revert MontoIncorrecto(msg.value, 0.01 ether);
        }

        if (_culture1 >= 15 || _culture2 >= 15 || _culture1 < 0 || _culture2 < 0) revert CulturaFueraDeRango(_culture1);

        string memory nombre1 = nombresCulturas[_culture1];
        string memory nombre2 = nombresCulturas[_culture2];

        s_selecciones[msg.sender] = Culturas(nombre1, nombre2);

        emit CulturasSeleccionadas(msg.sender, nombre1, nombre2);
    }

    // (Opcional) Para ver el nombre por índice
    function getNameCultures(uint8 index) external view returns (string memory) {
        if (index >= 15) revert CulturaFueraDeRango(index);
        if (index < 0) revert CulturaFueraDeRango(index);
        return nombresCulturas[index];
    }

    function withdrawFunds() external onlyOwner {
        (bool success, ) = payable(i_owner).call{value: address(this).balance}("");
        require(success, "Error al retirar fondos");
    }
}
