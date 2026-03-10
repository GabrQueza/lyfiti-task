# Lyfiti Task - AI Task Manager

Lyfiti Task é um dashboard inteligente desenvolvido em **Next.js (App Router)** com **TypeScript** e **Chakra UI v2**. O objetivo principal do projeto é permitir a inserção de tarefas que são imediatamente avaliadas por uma Inteligência Artificial (OpenAI) para determinar seu grau de **Impacto e Urgência**, gerando um score de 1 a 10.

## 🚀 Tecnologias Integradas
- **Framework:** Next.js 15 (React 19)
- **Linguagem:** TypeScript
- **Estilização & UI:** Chakra UI v2 + Emotion + Framer Motion
- **Inteligência Artificial:** SDK Oficial da OpenAI (modelo `gpt-4o-mini`)

---

## ⚙️ Como Executar o Projeto Localmente

1. **Clone o repositório** e entre na pasta do projeto.
2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo na raiz do projeto chamado `.env.local` e insira sua chave da API da OpenAI:
   ```env
   OPENAI_API_KEY=sk-proj-sua-chave-aqui
   ```
   > **⚠️ Importante sobre a OPENAI_API_KEY e o uso de Dados Mockados:**
   > Para que a IA avalie as tarefas de forma real, a chave fornecida precisa ter créditos/saldo na plataforma da OpenAI. Caso você não possua uma API Key válida ou ela exceda o limite da cota (Erro `429 insufficient_quota`), a aplicação está programada para não quebrar. 
   > Em caso de falha de cota, a API retornará um **Mock Data** (dados simulados), gerando uma pontuação dinâmica aleatória e preenchendo o texto de justificativa avisando que o limite da OpenAI foi atingido. Isso permite testar a UI do dashboard livremente independentemente do status da sua API.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação no navegador:**
   - [http://localhost:3000](http://localhost:3000) (Página Inicial)
   - [http://localhost:3000/dashboard](http://localhost:3000/dashboard) (Dashboard de Tarefas)

---

## 🎨 Como usar o Dashboard
Acesse a aba de **Dashboard**, insira o **Título** (ex: _"Resolver vazamento de memória do banco de dados"_) e uma **Descrição Contextual**. 

Clique em **"Evaluate & Create Task"**. O sistema enviará para a Rota `/api/prioritize`, acionando o LLM. Em instantes o _Card_ aparecerá em tela, e sua pontuação de impacto colorirá dinamicamente o componente (Verde = Baixo, Laranja = Médio, Vermelho = Alto).

---

## 🧠 Prompt System Utilizado (LLM)
Para garantir que a IA retornasse os dados no formato exato e avaliasse corretamente a urgência, o seguinte System Prompt foi utilizado na rota da API:

> You are an expert AI task manager. Evaluate the following task based on its title and description to determine its urgency and impact.
> Your response MUST be strictly a JSON object containing exactly two fields:
> - "score": an integer from 1 to 10 (10 being highest priority).
> - "justification": a brief, one-sentence explaining the reasoning for the score.
> Do not include any other text or markdown formatting outside of the JSON block.
