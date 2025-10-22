
## Constrhua

Plataforma para construções

#### Mapa do Projeto
```bash
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── about/
│   ├── contact/
│   │   └── page.tsx
│   ├── news/
│   │   ├── [slug]/
│   │   └── page.tsx
│   ├── products/
│   │   ├── [slug]/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── header.tsx
│   ├── footer.tsx
│   ├── banner.tsx
│   ├── carousel.tsx
│   └── ...
├── lib/
│   ├── constants.ts
│   └── utils.ts
├── styles/
│   └── globals.css
└── assets/
    ├── images/
    └── logos/
```
#### Para Codegen carregar a váriavel antes da execução instale esse pacote
npm install dotenv-cli --save-dev

#### Adicione o script no package.json
```bash
"scripts": {
  "codegen": "dotenv -e .env.local -- ts-node --project tsconfig.json codegen.ts" 
  // O 'dotenv -e .env.local' garante que o arquivo seja carregado
}
```

#### GitHub
```bash
echo "# constrhua-forntend" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:Gease-RS/constrhua-forntend.git
git push -u origin main
```

#### Limpar cache
```bash
npm cache clean --force
yarn cache clean
```

npm run codegen
# ou
yarn codegen

#### precedência de carregamento
.env.local
.env.development.local
.env.development
.env