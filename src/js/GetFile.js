import { readFile } from "fs";

class Dependence {
  constructor(name, subDependencies = []) {
    this.name = name;
    this.subDependencies = subDependencies;
  }
}

function readJSON(file) {
  return new Promise((resolve, reject) => {
    readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(`Erro ao ler o arquivo: ${err}`);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
}

async function loadDependencies(file) {
  let dependencies = [];

  try {
    const json = await readJSON(file);
    if (json) {

        Object.keys(json['packages']).forEach(chave => {
            if (json['packages'][chave]['dependencies']) {
              let subDependencies = []
              Object.keys(json['packages'][chave]['dependencies']).forEach(dep => {
                subDependencies.push(new Dependence(`node_modules/${dep}`));
              });
    
              dependencies.push(new Dependence(chave, subDependencies))
    
            } else dependencies.push(new Dependence(chave))
          });

        }
      } catch (error) {
    console.error(`Erro ao carregar arquivo: ${error}`);
  }

  return dependencies;
}

console.table(await loadDependencies("package copy.json"));
