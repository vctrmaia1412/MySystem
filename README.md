# 🎲 RifaApp - Sistema Completo de Rifas

Um sistema web completo para criação e participação em rifas online, desenvolvido com HTML, CSS e JavaScript puro.

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- Login e cadastro de usuários
- Contas demo disponíveis para teste
- Sessão persistente com localStorage

### 🎯 Gestão de Rifas
- **Criar Rifas**: Interface completa para criação com preview em tempo real
- **Sistema de Afiliados**: Adicione parceiros para divulgar suas rifas
- **Participar**: Sistema de compra de bilhetes com múltiplas quantidades
- **Acompanhar**: Visualização de progresso e estatísticas detalhadas
- **Finalização**: Sorteio automático quando todos os bilhetes são vendidos

### 💰 Sistema Financeiro Completo
- **Carteira Digital**: Saldo em tempo real e histórico de transações
- **Ganhos**: 92% do valor arrecadado (8% de taxa da plataforma)
- **Saques**: Sistema completo com PIX e transferência bancária
- **Taxa de Saque**: 8% sobre o valor solicitado

### 📱 Interface Mobile-First
- Design responsivo otimizado para dispositivos móveis
- Navegação intuitiva com menu inferior
- Animações suaves e feedback visual

## 🏗️ Estrutura do Projeto

```
PROJETO RIFA/
├── index.html          # Página de login/cadastro
├── home.html           # Página inicial com rifas de outros usuários
├── criar.html          # Criação de novas rifas
├── rifas.html          # Minhas rifas (gerenciamento)
├── carteira.html       # Carteira digital e transações
├── perfil.html         # Perfil do usuário e configurações
├── pagamento.html      # Página de pagamento (cartão, PIX, boleto)
├── saque.html          # Página de saque com dados bancários
├── tutoriais.html      # 🆕 Página de tutoriais e guias
├── css/
│   └── style.css       # Estilos globais
└── js/
    ├── data.js         # Gerenciamento de dados (localStorage)
    └── main.js         # Lógica principal (apenas index.html)
```

## 🆕 Nova Funcionalidade: Sistema de Afiliados

### Características do Sistema de Afiliados

#### 🤝 Criação com Afiliados
- **Durante a Criação**: Opção de incluir afiliado já na criação da rifa
- **Tipos de Comissão**: Percentual (1% a 50%) ou Valor Fixo (R$ 0,50 a R$ 10,00)
- **Validações**: Verificação de e-mail cadastrado e limites de comissão
- **Calculadora**: Preview em tempo real dos ganhos com desconto da comissão

#### 🔧 Gerenciamento Posterior
- **Adicionar Afiliado**: Botão dedicado em cada rifa ativa
- **Remover Afiliado**: Opção de remoção a qualquer momento
- **Estatísticas**: Acompanhamento de vendas e ganhos do afiliado
- **Histórico**: Registro completo de todas as comissões pagas

#### 💰 Sistema de Comissões
- **Cálculo Automático**: Processamento automático a cada venda
- **Desconto do Criador**: Comissão descontada do ganho do criador
- **Transações**: Registro detalhado de todas as comissões
- **Saldo em Tempo Real**: Atualização imediata do saldo do afiliado

#### 📊 Relatórios e Controle
- **Dashboard do Afiliado**: Visão completa das rifas que promove
- **Métricas Detalhadas**: Total de vendas, comissões e performance
- **Transparência**: Histórico completo visível para ambas as partes
- **Flexibilidade**: Alteração de comissões e remoção quando necessário

## 📚 Funcionalidade: Página de Tutoriais

### Características da Página de Tutoriais (`tutoriais.html`)

#### 📚 Conteúdo Educativo Completo
- **Como Criar Rifas**: Passo a passo detalhado para criar rifas de sucesso
- **Como Divulgar**: Estratégias eficazes para promover rifas nas redes sociais
- **O que Divulgar**: Conteúdo ideal e exemplos práticos de posts
- **Dicas de Sucesso**: Estratégias avançadas e melhores práticas

#### 🎯 Guias Práticos
- Escolha do prêmio ideal baseado no valor
- Definição do número de bilhetes por faixa de preço
- Criação de títulos atrativos e descrições completas
- Timing ideal para lançamento e divulgação

#### 📢 Estratégias de Divulgação
- Redes sociais (WhatsApp, Facebook, Instagram, TikTok)
- Círculo pessoal e comunidades online
- Divulgação local e boca a boca
- Estatísticas de eficácia por canal

#### ✍️ Exemplos e Templates
- Posts prontos para redes sociais
- Checklist de sucesso completo
- Dicas visuais e de formatação
- Avisos sobre legalidade e transparência

#### 💡 Interface Interativa
- 4 categorias organizadas em cards
- Navegação por abas com conteúdo dinâmico
- Design responsivo e mobile-first
- Boxes destacados para dicas importantes

## 📋 Funcionalidade: Página de Saque

### Características da Página de Saque (`saque.html`)

#### 💵 Seleção de Valor
- Botões rápidos: R$ 50, R$ 100, R$ 200, R$ 500
- Campo personalizado para qualquer valor
- Cálculo automático da taxa de 8%
- Preview do valor líquido a receber

#### 🏦 Métodos de Saque

**📱 PIX (Padrão)**
- Tipos de chave: CPF, E-mail, Telefone, Chave Aleatória
- Placeholder dinâmico baseado no tipo
- Validação de dados obrigatórios

**🏦 Conta Bancária**
- Lista completa de bancos brasileiros
- Campos: Banco, Agência, Conta, Tipo de Conta
- Dados do titular: Nome completo e CPF
- Formatação automática do CPF

#### ✅ Validações e Segurança
- Valor mínimo: R$ 10,00
- Verificação de saldo suficiente
- Validação de todos os campos obrigatórios
- Simulação de processamento (3 segundos)
- Tela de confirmação com detalhes

#### 📋 Informações Importantes
- Taxa de saque: 8% sobre o valor
- Processamento: 1-2 dias úteis
- Horário de funcionamento: Segunda a sexta, 9h às 18h
- Transferência segura com criptografia

## 🎮 Como Usar

### 1. Acesso ao Sistema
```
http://localhost:8000
```

### 2. Contas Demo Disponíveis
```
admin@rifaapp.com / 123456  (Saldo: R$ 7.279,52)
user@teste.com / 123456     (Saldo: R$ 150,00)
```

### 3. Fluxo de Saque
1. **Acesse a Carteira**: Menu inferior → 💰 Carteira
2. **Clique em Sacar**: Botão "💸 Sacar" no card de saldo
3. **Escolha o Valor**: Use botões rápidos ou digite o valor
4. **Selecione o Método**: PIX (padrão) ou Conta Bancária
5. **Preencha os Dados**: Informações bancárias completas
6. **Confirme**: Revise e solicite o saque
7. **Acompanhe**: Transação aparece no histórico

### 4. Navegação do Sistema
- **🏠 Home**: Rifas de outros usuários para participar
- **➕ Criar**: Criar suas próprias rifas
- **📋 Minhas**: Gerenciar suas rifas criadas
- **💰 Carteira**: Saldo, transações e saques
- **📚 Tutoriais**: Guias completos sobre rifas
- **👤 Perfil**: Dados pessoais e estatísticas

## 💾 Dados de Exemplo

### Usuários Cadastrados
- 7 usuários com saldos variados
- Histórico de transações realistas
- Rifas criadas por diferentes usuários

### Rifas Disponíveis
- 19 rifas no total (8 do admin + 11 de outros usuários)
- Categorias: Eletrônicos, Casa & Jardim, Veículos, Moda, Games, Bebidas
- Status variados: ativas, finalizadas, com diferentes progressos

### Transações
- Ganhos de vendas de bilhetes
- Saques realizados com taxas
- Participações em rifas de outros usuários

## 🔧 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Armazenamento**: localStorage (simulando backend)
- **Design**: Mobile-first, gradientes, animações CSS
- **Responsividade**: Grid CSS, Flexbox
- **Ícones**: Emojis nativos para compatibilidade universal

## 🚀 Iniciando o Servidor

### Opção 1: PHP (Recomendado)
```bash
php -S localhost:8000
```

### Opção 2: Python
```bash
python -m http.server 8000
```

### Opção 3: Node.js
```bash
npx http-server -p 8000
```

## 📱 Recursos Mobile

- Interface otimizada para telas pequenas
- Navegação por gestos
- Formulários adaptáveis
- Modais responsivos
- Feedback tátil visual

## 🔒 Segurança Simulada

- Validação de dados no frontend
- Simulação de criptografia
- Verificação de autenticação
- Proteção contra valores inválidos
- Timeout de sessão

## 🎯 Próximos Passos para App Real

### Backend
- API REST com Node.js/PHP/Python
- Banco de dados (MySQL/PostgreSQL)
- Autenticação JWT
- Validações server-side

### Pagamentos
- Integração com gateways (MercadoPago, PagSeguro)
- PIX real via API
- Webhooks para confirmação

### Mobile App
- React Native ou Flutter
- Push notifications
- Biometria para login
- Câmera para QR codes

### Infraestrutura
- Deploy em cloud (AWS, Heroku)
- CDN para imagens
- SSL/HTTPS
- Monitoramento e logs

## 📞 Suporte

Este é um projeto de demonstração. Para transformar em um sistema real, considere:

1. **Licenças**: Verificar regulamentações locais sobre rifas
2. **Compliance**: Adequação às leis de jogos e sorteios
3. **Segurança**: Implementar criptografia real
4. **Escalabilidade**: Arquitetura para muitos usuários
5. **Auditoria**: Logs e rastreabilidade completa

---

**Desenvolvido com ❤️ para demonstrar um sistema completo de rifas online** 