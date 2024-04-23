// Definição da classe "vertice" que representa um vértice no grafo.
export class vertice {
    constructor(nome = "") {
        this.nome = nome; // Nome do vértice.
    }
}

// Definição da classe "aresta" que representa uma aresta no grafo.
export class aresta {
    constructor(c = vertice, v = vertice, p = 0, n = "") {
        this.comeco = c; // Vértice de início da aresta.
        this.dest = v; // Vértice de destino da aresta.
        this.peso = p; // Peso da aresta (opcional).
        this.nome = n; // Nome da aresta (opcional).
    }
}

// Definição da classe "grafo" que representa um grafo.
export class grafo {
    constructor() {
        this.vertices = []; // Lista de vértices do grafo.
        this.lista_adj = new Map(); // Lista de adjacências do grafo.
    }

    // Método para adicionar vértices ao grafo.
    addVertices(v) {
        if (v in this.vertices) {
            return; // Retorna se o vértice já existe no grafo.
        }
        this.vertices.push(v); // Adiciona o vértice à lista de vértices.
        this.lista_adj.set(v, []); // Inicializa a lista de adjacências do vértice como vazia.
    }

    // Método para adicionar uma aresta ao grafo.
    addAresta(v, u, peso = 0, nome = "") {
        let tmp_a = new aresta(v, u, peso, nome); // Cria uma nova aresta.
        this.lista_adj.get(v).push(tmp_a); // Adiciona a aresta à lista de adjacências do vértice de origem.
    }

    // Método para verificar se dois vértices são adjacentes.
    sao_adjacentes(v, u) {
        if (!(v in this.vertices && u in this.vertices)) {
            return; // Retorna indefinido se um ou ambos os vértices não existem no grafo.
        }
        this.lista_adj.get(v).forEach(element => {
            if (element === u) {
                return true; // Retorna verdadeiro se os vértices forem adjacentes.
            }
        });
        return false; // Retorna falso se os vértices não forem adjacentes.
    }

    // // Método para remover uma aresta do grafo.
    // remover_aresta(v, a) {
    //     if (!(v in this.vertices && a in this.vertices.get(v))) {
    //         return; // Retorna se o vértice de origem ou a aresta não existirem no grafo.
    //     }
    //     const indice = this.vertices.get(v).indexOf(a); // Encontra o índice da aresta na lista de adjacências do vértice.
    //     this.vertices.get(v).splice(index, 1); // Remove a aresta da lista de adjacências do vértice.
    // }

    // // Método de busca em profundidade (DFS) recursivo.
    // dfs(v = 0, tempo = 0, time_in = [], time_out = []) {
    //     tempo = tempo + 1; // Incrementa o tempo.
    //     time_in[v] = 0; // Define o tempo de início para o vértice atual.

    //     for (e of this.lista_adj(v)) { // Para cada vértice adjacente ao vértice atual.
    //         let u = this.vertices.indexOf(e.dest); // Encontra o índice do vértice adjacente.
            
    //         if (time_out[u] == undefined) { // Se o vértice adjacente ainda não foi visitado.
    //             [tempo, time_in, time_out] = dfs(u, tempo, time_in, time_out); // Chama recursivamente a DFS para o vértice adjacente.
    //         }
    //     }

    //     tempo = tempo + 1; // Incrementa o tempo.
    //     time_out[v] = time; // Define o tempo de término para o vértice atual.
    //     return [tempo, time_in, time_out]; // Retorna o tempo, os tempos de início e de término.
    // }

    // // Método de busca em profundidade (DFS) para todo o grafo.
    // dfs() {
    //     let tempo = 0; // Tempo inicial.
    //     let time_in = []; // Array para os tempos de início.
    //     let time_out = []; // Array para os tempos de término.

    //     for (let i = 0; i < this.vertices.length; i++) { // Para cada vértice no grafo.
    //         if (time_in[i] == undefined) { // Se o vértice ainda não foi visitado.
    //             [tempo, time_in, time_out] = this.dfs(i, tempo, time_in, time_out); // Chama a DFS para esse vértice.
    //         }
    //     }

    //     return [time_in, time_out]; // Retorna os tempos de início e de término para todos os vértices.
    // }

    dfs()
    {
        const stack = this.vertices
        const visitado = new Set()
        const resultado = []

        while(stack.length)
        {
            const vertice = stack.pop()
            let tmp_lista = this.lista_adj.get(vertice)

            // console.log(tmp_lista)

            if(!visitado.has(vertice))
            {
                visitado.add(vertice)
                resultado.push(vertice)

                if(isIterable(tmp_lista))
                {
                    for(const e of tmp_lista)
                    {
                        stack.push(e.dest)
                    }
                }
            }
        }

        return resultado
    }
}

const isIterable = x => !!x?.[Symbol.iterator];

// Função para criar um grafo a partir de um mapa JSON.
export function create_graph_from_json(map) {
    let g = new grafo(); // Cria um novo grafo.

    if (map === null) {
        return; // Retorna se o mapa for nulo.
    }

    // Adicionando vértices ao grafo.
    for (let [key, value] of map) {
        let tmp_v_string = ""; // String temporária para o nome do vértice.
        
        if (key.includes("node_modules/")) { // Remove o prefixo "node_modules/" do nome do vértice, se presente.
            tmp_v_string = key.replace("node_modules/", "");
        } else {
            tmp_v_string = key;
        }

        if (key === "") {
            continue; // Pula para a próxima iteração se a chave for vazia.
        }
        let tmp_v = new vertice(tmp_v_string); // Cria um novo vértice com o nome temporário.
        g.addVertices(tmp_v); // Adiciona o vértice ao grafo.
    }

    // Adicionando arestas ao grafo com base nas dependências do mapa.
    for (let i of g.vertices) { // Para cada vértice no grafo.
        for (let [key, value] of map) { // Para cada chave e valor no mapa JSON.
            if (value.dependencies != undefined) { // Se houver dependências.
                let tmp_arr = Object.keys(value.dependencies); // Obtém as chaves das dependências.
                for (let j = 0; j < tmp_arr.length; j++) { // Para cada dependência.
                    if (key.includes(i.nome)) { // Se o nome do vértice estiver contido na chave.
                        let tmp_vert = new vertice(tmp_arr[j]); // Cria um novo vértice para a dependência.
                        g.addAresta(i, tmp_vert, 0, i.nome + "->" + tmp_arr[j]); // Adiciona uma aresta entre o vértice atual e a dependência.
                    }
                }
            } else {
                continue; // Pula para a próxima iteração se não houver dependências.
            }
        }
    }
    return g; // Retorna o grafo criado.
}
