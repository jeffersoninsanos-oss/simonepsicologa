# Simone Costa — Site da psicóloga

Site institucional em português: apresentação, atendimento (crianças, adolescentes e adultos),
palestras para empresas e escolas, localização e contato por WhatsApp.

## Como rodar

Extraia o conteúdo deste arquivo na raiz do repositório e execute:

```bash
bun install
bun run dev     # abre o site em modo de desenvolvimento
bun run build   # gera a versão de produção
```

## Tecnologias

- React 19 + TypeScript
- TanStack Start (rotas, renderização no servidor)
- Tailwind CSS v4
- Build preparado para Cloudflare

## Conteúdo

- `src/routes/` — uma página por seção: início, sobre, atendimento, palestras, contato.
- `src/components/site.tsx` — cabeçalho, rodapé e todas as seções usadas pelas páginas.
- `src/styles.css` — cores, fontes, efeitos e ajustes para celular.
- `src/components/ui/button.tsx` — botões do site.
- `public/images/` — fotos e o logo oficial com fundo transparente.
- `public/favicon.png` — ícone do navegador, derivado do logo.
- `src/test/` — testes de navegação.

## Observações

- O GitHub armazena o código, mas não publica o site automaticamente.
- GitHub Pages não executa TanStack Start; para publicar, use a plataforma indicada no arquivo de build (Cloudflare) ou um host Node.
- Nenhuma senha, chave privada ou dado de acesso está incluído neste pacote.
