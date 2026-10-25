# Continuidade pelo GitHub

A branch adotada é `main`. Preserve a `master` histórica; ela tem origem independente e não deve ser mesclada automaticamente.

## Iniciar uma cópia nova

```bash
git clone https://github.com/rua124164/Projeto-Integrador.git
cd Projeto-Integrador
git status --short --branch
git remote -v
git switch main
```

Antes de atualizar uma cópia existente, confira o status e preserve alterações locais. Com a árvore limpa:

```bash
git pull --ff-only origin main
```

Se o comando falhar, examine a divergência antes de continuar. Não use reset destrutivo nem force push.

## Registrar uma tarefa real

Teste a alteração e revise cada arquivo antes de adicioná-lo:

```bash
git status --short
git diff
git add caminho/do/arquivo
git diff --cached
git commit -m "Descrição específica da alteração"
```

O caminho é um exemplo: substitua pelo arquivo desejado. Faça commits pequenos e descritivos, com autoria real. Não altere o histórico para simular participação.

Somente após revisão e autorização para envio:

```bash
git push origin main
```

Não publique no GitHub Pages sem autorização específica.
