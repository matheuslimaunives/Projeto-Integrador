# Conecta Vida IA

**Plataforma Inteligente de Acessibilidade, Comunicação e Inclusão**

## Sobre o projeto

O **Conecta Vida IA** é desenvolvido no **Projeto Integrador em Computação II**, do curso de Engenharia da Computação da UNIVESP.

A proposta é desenvolver uma plataforma de tecnologia assistiva voltada inicialmente para **pessoas com dificuldade de fala** e **pessoas idosas**. O sistema busca reduzir barreiras de comunicação e de interação com dispositivos digitais por meio de uma interface simples, acessível e personalizada.

O desenvolvimento será realizado **em camadas**, priorizando inicialmente os requisitos essenciais e a validação da interface. Recursos mais complexos, incluindo funcionalidades de inteligência artificial, serão incorporados gradualmente após a validação das etapas anteriores.

## Grupo e integrantes

**Grupo:** 14  
**Curso:** Engenharia da Computação  
**Disciplina:** Projeto Integrador em Computação II  
**Instituição:** Universidade Virtual do Estado de São Paulo – UNIVESP  
**Orientador:** Eduardo Scabora

### Integrantes

1. Aderlucio Santana da Rocha
2. André Luiz Pinto Santos
3. José Gleidson Bezerra de Macena
4. Matheus Souza Lima
5. Priscila de Cássia Cruz Melo
6. Paulo André da Cruz Alvino
7. Sergio Murilo da Silva

> Para demonstrar a participação e a divisão de tarefas, cada integrante deverá utilizar seu próprio usuário do GitHub nos commits referentes às atividades que efetivamente desenvolver.

## Requisitos da primeira camada

Fluxo inicial:

**Cadastro → Perfil → Seleção de recursos → Interface personalizada**

### RF01 – Cadastrar usuário

Permitir o cadastro das informações básicas necessárias para iniciar a personalização da plataforma.

### RF02 – Selecionar recursos de acessibilidade

Permitir selecionar os recursos de acessibilidade que deverão ficar disponíveis para o usuário.

### RF03 – Adaptar a tela inicial

Montar a interface inicial de acordo com o perfil e os recursos selecionados.

### Requisitos não funcionais

- Simplicidade de uso;
- Acessibilidade;
- Facilidade de aprendizado;
- Personalização;
- Privacidade;
- Segurança;
- Desempenho;
- Compatibilidade.

## Tecnologias e ferramentas utilizadas

Nesta primeira base:

- **HTML5** – estrutura da aplicação;
- **CSS3** – apresentação e recursos visuais de acessibilidade;
- **JavaScript** – lógica, interação e personalização;
- **LocalStorage** – armazenamento local utilizado no protótipo;
- **Git** – controle de versão;
- **GitHub** – hospedagem do repositório e colaboração entre os integrantes.

Recursos relacionados a voz, câmera, Libras, inteligência artificial e automações fazem parte da evolução planejada e **não são apresentados como funcionalidades concluídas nesta primeira camada**.

## Estrutura do repositório

```text
Conecta_Vida_IA/
├── index.html
├── README.md
├── .gitignore
├── docs/
│   └── GUIA_COLABORACAO_GITHUB.md
└── src/
    ├── app.js
    └── style.css
```

- `index.html`: página principal;
- `src/app.js`: lógica da aplicação;
- `src/style.css`: estilos e recursos visuais;
- `README.md`: documentação principal;
- `docs/`: documentação de apoio ao desenvolvimento;
- `.gitignore`: arquivos que não devem ser versionados.

Documentos acadêmicos, como Plano de Ação e Relatório Parcial, devem permanecer organizados separadamente do código-fonte caso sejam incluídos no repositório.

## Como instalar e executar

Esta primeira versão não possui dependências externas.

### Pré-requisitos

- Windows, Linux ou macOS;
- navegador web atualizado;
- Git, caso seja utilizado o processo de clonagem.

### Opção 1 – Download

Baixe o projeto e abra o arquivo `index.html` em um navegador.

### Opção 2 – Git

```bash
git clone URL_DO_REPOSITORIO
cd Conecta_Vida_IA
```

Depois, abra `index.html` no navegador.

> Substitua `URL_DO_REPOSITORIO` pelo endereço público do repositório após sua criação no GitHub.

## Como testar a aplicação

1. Informe o nome do usuário.
2. Selecione a faixa etária.
3. Escolha o perfil **Pessoa idosa** ou **Dificuldade de fala**.
4. Selecione os recursos de acessibilidade desejados.
5. Clique em **Criar minha tela personalizada**.
6. Verifique se a interface apresenta os recursos correspondentes ao perfil configurado.

## Participação e colaboração

O GitHub será utilizado também como evidência da evolução colaborativa do PJI.

O grupo adotará as seguintes práticas:

- cada integrante utilizará seu próprio usuário do GitHub;
- as tarefas serão distribuídas entre os integrantes;
- as alterações serão versionadas progressivamente;
- os commits deverão corresponder a alterações reais realizadas no projeto;
- o desenvolvimento não será concentrado em um único commit no final da etapa.

O histórico deverá permitir identificar a evolução do sistema e a participação dos integrantes.

## Qualidade e frequência dos commits

As mensagens devem explicar claramente a alteração realizada.

### Exemplos

```text
Criação da estrutura inicial da aplicação
Implementação do cadastro do usuário
Criação dos perfis iniciais
Implementação da seleção de recursos de acessibilidade
Implementação da personalização da tela inicial
Ajuste da interface para usuários idosos
Melhoria de contraste e tamanho dos controles
Correção da validação do formulário
Atualização da documentação do README
```

Evitar mensagens genéricas como:

```text
Atualização
Teste
Alterações
Final
```

## Desenvolvimento em camadas

### Camada 1 – Base e personalização

**Status: em desenvolvimento**

- cadastro;
- perfis iniciais;
- seleção de recursos;
- interface personalizada;
- recursos iniciais de acessibilidade.

### Camada 2 – Comunicação assistida

**Status: primeira versão funcional implementada.**

Recursos disponíveis: grade de cartões ilustrados por categoria, reprodução de frases em português, inclusão de imagens próprias e gravação de áudio pelo microfone. Os cartões personalizados são armazenados localmente via IndexedDB.

Próximas melhorias previstas:

- categorias de comunicação;
- imagens;
- frases prontas;
- montagem de mensagens;
- reprodução da mensagem.

### Camada 3 – Recursos para pessoas idosas

- interface simplificada;
- textos e controles maiores;
- redução do número de etapas;
- orientação guiada.

### Camada 4 – Recursos assistivos adicionais

- câmera;
- áudio;
- recursos relacionados à Libras;
- outros recursos definidos após levantamento e testes.

### Camada 5 – Inteligência artificial

A IA será incorporada posteriormente, após a validação dos fluxos essenciais e da utilidade dos recursos básicos.

## Status atual

**Primeira base funcional criada, com cadastro de usuário, perfis iniciais, seleção de recursos de acessibilidade e interface personalizada.**

## Informações para envio

**Grupo:** 14

**Link do GitHub:** `[INSERIR URL PÚBLICA DO REPOSITÓRIO]`

**Status atual:** Primeira base funcional criada, com cadastro de usuário, perfis iniciais, seleção de recursos de acessibilidade e interface personalizada.

> Antes do envio, verificar se o repositório está **Público**. Caso o repositório precise permanecer privado, verificar a orientação da UNIVESP e adicionar o usuário indicado pelo professor como colaborador.

## Próxima etapa

A próxima etapa de desenvolvimento será o módulo de **Comunicação Assistida**, mantendo o desenvolvimento incremental e registrando no GitHub a participação dos integrantes por meio de commits próprios e descritivos.


## Testar o módulo de Comunicação Assistida

1. Cadastre um usuário com perfil **Dificuldade de fala** (ou habilite **Comunicação por imagens e frases** no perfil de pessoa idosa).
2. Na tela inicial, clique em **Abrir módulo** no cartão **Comunicação assistida**.
3. Selecione uma categoria e clique em uma figura: o navegador reproduzirá a frase em português (a disponibilidade da voz depende do navegador/sistema).
4. Clique em **Nova imagem**, informe nome, frase e categoria, e escolha um arquivo JPG, PNG ou WebP de até 2 MB.
5. Opcionalmente, clique em **Iniciar gravação**, permita o uso do microfone, fale e clique em **Parar gravação**. Ouça a gravação e salve.
6. O novo cartão aparecerá na categoria selecionada. Ao clicar, reproduzirá o áudio gravado; sem gravação, usará a leitura automática da frase.

**Importante:** para usar o microfone, execute a aplicação em `localhost` ou HTTPS. Exemplo, com Python instalado:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. O GitHub Pages também utiliza HTTPS. O armazenamento é local: dados e áudios não são sincronizados entre aparelhos e podem desaparecer ao limpar os dados do navegador. Para esta etapa, os pictogramas padrão são representados por emojis; imagens personalizadas são carregadas pelo usuário.
