// Explicando as importações para um iniciante em Node.js:

// 'fs' é um módulo do Node.js que permite ler e escrever arquivos (file system).
import fs from 'fs';

// 'path' ajuda a lidar com caminhos de arquivos e pastas de forma segura no sistema operacional.
import path from 'path';

// 'fileURLToPath' converte o endereço do arquivo (formato URL) para um caminho normal de arquivo.
// Em projetos Node modernos (usando import/export), isso é necessário para obter o caminho real do arquivo atual.
import { fileURLToPath } from 'url';

// As linhas abaixo montam o caminho certinho do arquivo 'dados.txt':

// O que cada parte faz:
// - import.meta.url: retorna a URL deste arquivo JS em execução. Comum em projetos que usam "import/export".
// - path: módulo do Node.js para trabalhar com caminhos de arquivos de forma segura, independente do sistema operacional.
// - path.join: junta partes de caminhos (por exemplo, pasta + nome do arquivo) garantindo que as barras e formatação fiquem corretas.

// Primeiro, pega o caminho completo deste arquivo usando import.meta.url convertido para um caminho normal:
const __filename = fileURLToPath(import.meta.url);

// Depois, pega só a pasta onde este arquivo está:
const __dirname = path.dirname(__filename);

// Por fim, junta a pasta (__dirname) com o nome do arquivo ('dados.txt'), formando o caminho certinho até 'dados.txt':
const filePath = path.join(__dirname, 'dados.txt');

fs.writeFileSync(filePath, 'Ola! Node.js!'); // Crie um arquivo dados.txt com a informacao 'Ola! Node.js!'
const readFile = fs.readFileSync(filePath, 'utf8'); // Ler o arquivo dados.txt 
console.log(readFile);  // Imprime a mensagem do arquivo readFile que seria o dados.txt