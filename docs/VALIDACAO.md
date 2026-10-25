# Roteiro de validação manual

Execute na raiz com `python -m http.server 8000` e abra http://localhost:8000. Para microfone, use localhost ou HTTPS.

Registre data, navegador, dispositivo, resultado e evidência. Os itens abaixo são verificações propostas; não representam testes já concluídos.

1. Tentar cadastrar apenas espaços: deve pedir um nome válido. Corrigir e cadastrar normalmente.
2. Testar os dois perfis, seleção de recursos e persistência após recarregar.
3. Simular armazenamento indisponível: cadastro deve continuar na sessão e avisar que não foi salvo.
4. Abrir comunicação, filtrar categorias, ouvir frases e salvar imagem válida. Rejeitar tipo inválido e imagem maior que 2 MB.
5. Gravar, parar, ouvir, salvar e reproduzir áudio. Recarregar e verificar cartão salvo.
6. Negar o microfone e verificar orientação de erro.
7. Reconfigurar enquanto grava: indicador de microfone deve encerrar. Repetir enquanto a permissão ainda está pendente; ao aceitá-la, o microfone não deve permanecer aberto.
8. Voltar à tela inicial durante reprodução: áudio e leitura devem parar.
9. Navegar por teclado: ao abrir comunicação, o foco deve alcançar seu título; verificar rótulos, contraste e zoom a 200%.
10. Confirmar indicação “Em desenvolvimento” nos módulos demonstrativos.
11. Verificar que reconfigurar remove o perfil, mas mantém cartões locais, conforme documentação.

## Verificações desta revisão

Em 25/10/2026, passaram as verificações de sintaxe JavaScript, `git diff --check` e simulações em Node.js para: nome em branco e correção da entrada; armazenamento bloqueado; reconfiguração; permissão de microfone pendente; encerramento da gravação ao sair.

Essas simulações usam objetos de navegador substitutos. Os testes manuais em navegador real, reprodução de voz, áudio e acessibilidade permanecem pendentes.
