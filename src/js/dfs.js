export class vertice
{
    constructor(nome = "")
    {
        this.nome = nome
    }
}

export class aresta
{
    constructor(c = vertice, v = vertice, p = 0, n = "")
    {
        this.comeco = c//vertice
        this.dest = v//vertice destino
        this.peso = p
        this.nome = n
    }
}

export class grafo
{
    constructor()
    {
        this.vertices = []
        this.lista_adj = new Map();
    }

    addVertices(v)
    {
        if(v in this.vertices)
        {
            return
        }

        this.vertices.push(v)
        this.lista_adj.set(v, [])
    }

    addAresta(v, u, peso = 0, nome = "")
    {
        if(!(v in this.vertices && u in this.vertices))
        {
            return
        }
        this.lista_adj.get(v).push(new aresta(v, u, peso, nome))
    }

    sao_adjacentes(v, u)
    {
        if(!(v in this.vertices && u in this.vertices))
        {
            return
        }

        this.lista_adj.get(v).forEach(element => {
            if(element === u)
            {
                return true
            }
        })

        return false
    }

    remover_aresta(v, a)
    {
        if(!(v in this.vertices && a in this.vertices.get(v)))
        {
            return
        }

        const indice = this.vertices.get(v).indexOf(a)
        this.vertices.get(v).splice(index, 1)
    }

    dfs()
    {

    }
}

export function create_graph_from_json(map)
{
    let g = new grafo()

    if(map === null)
    {
        console.log("WHY")
        return
    }

    //Adicionando vertices
    for(let [key, value] of map)
    {
        // let tmp_arr = []
        let tmp_v_string = ""
        
        if(key.includes("node_modules/"))
        {
            tmp_v_string = key.replace("node_modules/", "")
        }
        else
        {
            tmp_v_string = key
        }

        if(key === "")
        {
            continue
        }
        let tmp_v = new vertice(tmp_v_string)

        g.addVertices(tmp_v)
    }

    
    for(let i of g.vertices)
    {
        //console.log(i)
        for(let [key, value] of map)
        {
            if(value.dependencies != undefined)
            {
                let tmp_arr = Object.keys(value.dependencies)
                for(let j of tmp_arr)
                {
                    let tmp_vert = new vertice(j)
                    // console.log(i)
                    g.addAresta(i, tmp_vert, 0, "")
                }
                //console.log(tmp_arr)
            }
            else
            {
                continue
            }
        }
    }
    return g
}