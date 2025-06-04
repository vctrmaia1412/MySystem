// Aplicação Principal - RifaApp
class RifaApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'anuncios';
        this.selectedRifaId = null;
        this.init();
    }

    // Inicialização da aplicação
    init() {
        this.checkAuth();
        this.bindEvents();
        this.updateUserBalance();
    }

    // Verifica se usuário está logado
    checkAuth() {
        console.log('Verificando autenticação...');
        this.currentUser = dataManager.getCurrentUser();
        console.log('Usuário atual:', this.currentUser);
        
        if (this.currentUser) {
            console.log('Usuário logado, redirecionando para home');
            // Redireciona diretamente para a página home
            window.location.href = 'home.html';
        } else {
            console.log('Usuário não logado, mostrando tela de login');
            this.showLoginScreen();
        }
    }

    // Vincula eventos aos elementos
    bindEvents() {
        // Formulários de login e cadastro
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Atualização de quantidade de bilhetes no modal
        document.getElementById('ticket-quantity').addEventListener('input', (e) => {
            this.updateTotalPrice();
        });
    }

    // Exibe tela de login
    showLoginScreen() {
        document.getElementById('login-screen').classList.add('active');
        document.getElementById('main-screen').classList.remove('active');
    }

    // Exibe tela principal
    showMainScreen() {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('main-screen').classList.add('active');
    }

    // Alterna entre formulários de login e cadastro
    showLoginForm() {
        document.getElementById('login-form').classList.add('active');
        document.getElementById('register-form').classList.remove('active');
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
    }

    showRegisterForm() {
        document.getElementById('login-form').classList.remove('active');
        document.getElementById('register-form').classList.add('active');
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
    }

    // Manipula login
    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = dataManager.getUserByEmail(email);
        if (user && user.password === password) {
            this.currentUser = user;
            dataManager.setCurrentUser(user);
            this.showMessage('Login realizado com sucesso! Redirecionando...', 'success');
            // Redireciona para home após um breve delay para mostrar a mensagem
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        } else {
            this.showMessage('Email ou senha incorretos!', 'error');
        }
    }

    // Manipula cadastro
    handleRegister() {
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;

        if (password !== confirmPassword) {
            this.showMessage('As senhas não coincidem!', 'error');
            return;
        }

        if (dataManager.getUserByEmail(email)) {
            this.showMessage('Este email já está cadastrado!', 'error');
            return;
        }

        const newUser = dataManager.createUser({ email, password });
        this.currentUser = newUser;
        dataManager.setCurrentUser(newUser);
        this.showMessage('Cadastro realizado com sucesso! Redirecionando...', 'success');
        // Redireciona para home após um breve delay para mostrar a mensagem
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
    }

    // Navega entre páginas
    showPage(page) {
        console.log('Navegando para página:', page);
        this.currentPage = page;
        
        try {
            // Atualiza navegação
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.querySelector(`[onclick="showPage('${page}')"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }

            // Atualiza título
            const titles = {
                'anuncios': 'Rifas Disponíveis',
                'criar': 'Criar Nova Rifa',
                'minhas': 'Minhas Rifas',
                'carteira': 'Minha Carteira',
                'perfil': 'Meu Perfil'
            };
            const titleElement = document.getElementById('page-title');
            if (titleElement) {
                titleElement.textContent = titles[page];
            }

            // Carrega conteúdo da página
            this.loadPageContent(page);
            this.updateUserBalance();
            console.log('Página carregada com sucesso:', page);
        } catch (error) {
            console.error('Erro ao carregar página:', error);
        }
    }

    // Carrega conteúdo específico de cada página
    loadPageContent(page) {
        const content = document.getElementById('main-content');
        
        switch(page) {
            case 'anuncios':
                // Redireciona para a página home
                window.location.href = 'home.html';
                break;
            case 'criar':
                // Redireciona para a página dedicada de criar rifa
                window.location.href = 'criar.html';
                break;
            case 'minhas':
                this.loadMinhasRifasPage(content);
                break;
            case 'carteira':
                // Redireciona para a página dedicada da carteira
                window.location.href = 'carteira.html';
                break;
            case 'perfil':
                // Redireciona para a página dedicada do perfil
                window.location.href = 'perfil.html';
                break;
        }
    }

    // Página de anúncios (rifas públicas)
    loadAnunciosPage(content) {
        console.log('Carregando página de anúncios...');
        const rifas = dataManager.getActiveRifas();
        console.log('Rifas encontradas:', rifas.length);
        
        if (rifas.length === 0) {
            content.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🎲</div>
                    <h3>Nenhuma rifa disponível</h3>
                    <p>Seja o primeiro a criar uma rifa!</p>
                    <button class="btn-primary" onclick="app.showPage('criar')" style="margin-top: 20px;">
                        Criar Primeira Rifa
                    </button>
                </div>
            `;
            return;
        }

        // Estatísticas gerais
        const totalRifas = rifas.length;
        const totalBilhetes = rifas.reduce((sum, rifa) => sum + rifa.totalTickets, 0);
        const bilhetesVendidos = rifas.reduce((sum, rifa) => sum + rifa.soldTickets, 0);
        const arrecadacaoTotal = rifas.reduce((sum, rifa) => sum + (rifa.soldTickets * rifa.ticketPrice), 0);

        // Filtros e ordenação
        const filterHtml = `
            <div class="rifas-header">
                <div class="rifas-stats">
                    <div class="stat-card">
                        <div class="stat-number">${totalRifas}</div>
                        <div class="stat-label">Rifas Ativas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${bilhetesVendidos}</div>
                        <div class="stat-label">Bilhetes Vendidos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${dataManager.formatCurrency(arrecadacaoTotal)}</div>
                        <div class="stat-label">Arrecadação Total</div>
                    </div>
                </div>
                
                <div class="rifas-filters">
                    <div class="filter-group">
                        <select id="sort-rifas" onchange="app.sortRifas(this.value)">
                            <option value="newest">Mais Recentes</option>
                            <option value="oldest">Mais Antigas</option>
                            <option value="progress">Maior Progresso</option>
                            <option value="tickets">Mais Bilhetes</option>
                            <option value="price">Maior Arrecadação</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <input type="text" id="search-rifas" placeholder="🔍 Buscar rifas..." onkeyup="app.searchRifas(this.value)">
                    </div>
                </div>
            </div>
        `;

        const rifasHtml = rifas.map(rifa => {
            const progress = (rifa.soldTickets / rifa.totalTickets) * 100;
            const arrecadacao = rifa.soldTickets * rifa.ticketPrice;
            const bilhetesRestantes = rifa.totalTickets - rifa.soldTickets;
            const creator = dataManager.getUserById(rifa.creatorId);
            const timeAgo = this.getTimeAgo(rifa.createdAt);
            
            // Status da rifa
            let statusClass = 'status-active';
            let statusText = 'Ativa';
            let urgencyBadge = '';
            
            if (progress >= 90) {
                urgencyBadge = '<span class="urgency-badge hot">🔥 Quase Esgotada!</span>';
            } else if (progress >= 70) {
                urgencyBadge = '<span class="urgency-badge warm">⚡ Vendendo Rápido!</span>';
            } else if (bilhetesRestantes <= 10) {
                urgencyBadge = '<span class="urgency-badge hot">⏰ Últimos Bilhetes!</span>';
            }

            // Verifica se o usuário já participou
            const userParticipations = dataManager.getUserParticipations(this.currentUser.id);
            const userParticipated = userParticipations.some(p => p.rifaId === rifa.id);
            const participationBadge = userParticipated ? '<span class="participation-badge">✅ Você Participa</span>' : '';
            
            return `
                <div class="rifa-card fade-in" data-rifa-id="${rifa.id}" data-title="${rifa.title.toLowerCase()}" data-progress="${progress}">
                    <div class="rifa-header">
                        ${urgencyBadge}
                        ${participationBadge}
                        <div class="rifa-creator">Por: ${creator?.email.split('@')[0] || 'Usuário'}</div>
                    </div>
                    
                    <div class="rifa-image-container">
                        <div class="rifa-image" style="background-image: url('${rifa.image}'); background-size: cover; background-position: center;">
                            ${!rifa.image.includes('http') ? '🎁' : ''}
                        </div>
                        <div class="rifa-overlay">
                            <div class="rifa-time">${timeAgo}</div>
                        </div>
                    </div>
                    
                    <div class="rifa-content">
                        <h3 class="rifa-title">${rifa.title}</h3>
                        <p class="rifa-description">${rifa.description}</p>
                        
                        <div class="rifa-details">
                            <div class="detail-row">
                                <span class="detail-label">💰 Valor do Bilhete:</span>
                                <span class="rifa-price">${dataManager.formatCurrency(rifa.ticketPrice)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">🎫 Bilhetes:</span>
                                <span class="rifa-progress">${rifa.soldTickets}/${rifa.totalTickets}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">💵 Arrecadação:</span>
                                <span class="rifa-earning">${dataManager.formatCurrency(arrecadacao)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">📊 Progresso:</span>
                                <span class="progress-percentage">${progress.toFixed(1)}%</span>
                            </div>
                        </div>
                        
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                            <div class="progress-text">${rifa.soldTickets} de ${rifa.totalTickets}</div>
                        </div>
                        
                        <div class="rifa-footer">
                            <div class="tickets-remaining">
                                <span class="remaining-count">${bilhetesRestantes}</span>
                                <span class="remaining-label">bilhetes restantes</span>
                            </div>
                            
                            <div class="rifa-actions">
                                <button class="btn-small btn-view" onclick="app.viewRifaDetails(${rifa.id})">
                                    👁️ Ver Detalhes
                                </button>
                                <button class="btn-small btn-participate ${bilhetesRestantes === 0 ? 'disabled' : ''}" 
                                        onclick="app.openParticipateModal(${rifa.id})" 
                                        ${bilhetesRestantes === 0 ? 'disabled' : ''}>
                                    ${bilhetesRestantes === 0 ? '🚫 Esgotada' : '🎯 Participar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        content.innerHTML = `
            ${filterHtml}
            <div class="rifa-grid" id="rifas-container">
                ${rifasHtml}
            </div>
        `;
    }

    // Página de criar rifa
    loadCriarPage(content) {
        content.innerHTML = `
            <div class="create-form fade-in">
                <h3>🎲 Criar Nova Rifa</h3>
                <form id="create-rifa-form">
                    <div class="input-group">
                        <label>Título da Rifa</label>
                        <input type="text" id="rifa-title" placeholder="Ex: iPhone 14 Pro" required>
                    </div>
                    <div class="input-group">
                        <label>Descrição</label>
                        <textarea id="rifa-description" placeholder="Descreva o prêmio da rifa..." required></textarea>
                    </div>
                    <div class="input-group">
                        <label>URL da Imagem (opcional)</label>
                        <input type="url" id="rifa-image" placeholder="https://exemplo.com/imagem.jpg">
                    </div>
                    <div class="input-group">
                        <label>Número de Bilhetes</label>
                        <input type="number" id="rifa-tickets" min="10" max="1000" placeholder="100" required>
                    </div>
                    <div class="input-group">
                        <label>Valor por Bilhete</label>
                        <input type="text" value="R$ 19,90" disabled>
                        <small style="color: #666; margin-top: 5px; display: block;">Valor fixo para todas as rifas</small>
                    </div>
                    <button type="submit" class="btn-primary">Criar Rifa</button>
                </form>
            </div>
        `;

        // Vincula evento do formulário
        document.getElementById('create-rifa-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateRifa();
        });
    }

    // Página de minhas rifas
    loadMinhasRifasPage(content) {
        const rifas = dataManager.getUserRifas(this.currentUser.id);
        
        if (rifas.length === 0) {
            content.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <h3>Você ainda não criou rifas</h3>
                    <p>Crie sua primeira rifa e comece a ganhar dinheiro!</p>
                    <button class="btn-primary" onclick="app.showPage('criar')">Criar Rifa</button>
                </div>
            `;
            return;
        }

        const rifasHtml = rifas.map(rifa => {
            const progress = (rifa.soldTickets / rifa.totalTickets) * 100;
            const arrecadacao = rifa.soldTickets * rifa.ticketPrice;
            const participations = dataManager.getRifaParticipations(rifa.id);
            
            let statusBadge = '';
            let actionButton = '';
            
            if (rifa.status === 'active') {
                statusBadge = '<span style="background: #28a745; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">Ativa</span>';
                actionButton = `<button class="btn-small btn-finish" onclick="app.openFinishModal(${rifa.id})">Encerrar Rifa</button>`;
            } else if (rifa.status === 'finished') {
                const winner = dataManager.getUserById(rifa.winnerId);
                statusBadge = '<span style="background: #dc3545; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">Finalizada</span>';
                actionButton = `<p style="color: #28a745; font-weight: 600;">🏆 Vencedor: ${winner?.email || 'Usuário removido'}</p>`;
            }
            
            return `
                <div class="rifa-card fade-in">
                    <div class="rifa-image" style="background-image: url('${rifa.image}'); background-size: cover; background-position: center;">
                        ${!rifa.image.includes('http') ? '🎁' : ''}
                    </div>
                    <div class="rifa-content">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <h3 class="rifa-title">${rifa.title}</h3>
                            ${statusBadge}
                        </div>
                        <p class="rifa-description">${rifa.description}</p>
                        <div class="rifa-info">
                            <span class="rifa-price">R$ ${rifa.ticketPrice.toFixed(2)}</span>
                            <span class="rifa-progress">${rifa.soldTickets}/${rifa.totalTickets} bilhetes</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <p><strong>Arrecadação:</strong> ${dataManager.formatCurrency(arrecadacao)}</p>
                        <p><strong>Participantes:</strong> ${participations.length}</p>
                        <div class="rifa-actions">
                            ${actionButton}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        content.innerHTML = `<div class="rifa-grid">${rifasHtml}</div>`;
    }

    // Página da carteira
    loadCarteiraPage(content) {
        const user = dataManager.getCurrentUser();
        const transactions = dataManager.getUserTransactions(user.id);
        const stats = dataManager.getUserStats(user.id);

        const transactionsHtml = transactions.length > 0 ? 
            transactions.map(transaction => {
                const isPositive = transaction.amount > 0;
                const amountClass = isPositive ? 'positive' : 'negative';
                const icon = transaction.type === 'earning' ? '💰' : 
                           transaction.type === 'withdrawal' ? '🏦' : '🎫';
                
                return `
                    <div class="transaction-item">
                        <div class="transaction-info">
                            <h4>${icon} ${transaction.description}</h4>
                            <p>${dataManager.formatDate(transaction.createdAt)}</p>
                        </div>
                        <div class="transaction-amount ${amountClass}">
                            ${dataManager.formatCurrency(transaction.amount)}
                        </div>
                    </div>
                `;
            }).join('') :
            `
                <div class="empty-state">
                    <div class="empty-state-icon">💳</div>
                    <h3>Nenhuma transação</h3>
                    <p>Suas transações aparecerão aqui</p>
                </div>
            `;

        content.innerHTML = `
            <div class="fade-in">
                <div class="wallet-summary">
                    <div class="wallet-balance">${dataManager.formatCurrency(user.balance)}</div>
                    <div class="wallet-subtitle">Saldo disponível</div>
                    <button class="btn-primary mt-20" onclick="app.requestWithdrawal()" ${user.balance <= 0 ? 'disabled' : ''}>
                        Solicitar Saque
                    </button>
                </div>
                
                <div class="transaction-list">
                    <h3 style="margin-bottom: 20px;">📊 Estatísticas</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: #667eea;">${stats.totalRifasCreated}</div>
                            <div style="font-size: 0.9rem; color: #666;">Rifas Criadas</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: #28a745;">${stats.totalParticipations}</div>
                            <div style="font-size: 0.9rem; color: #666;">Participações</div>
                        </div>
                    </div>
                    
                    <h3 style="margin-bottom: 20px;">📋 Histórico de Transações</h3>
                    ${transactionsHtml}
                </div>
            </div>
        `;
    }

    // Página do perfil
    loadPerfilPage(content) {
        const user = dataManager.getCurrentUser();
        const stats = dataManager.getUserStats(user.id);

        content.innerHTML = `
            <div class="fade-in">
                <div class="profile-info">
                    <div class="profile-avatar">👤</div>
                    <h3>${user.email}</h3>
                    <p style="color: #666; margin-top: 10px;">Membro desde ${dataManager.formatDate(user.createdAt)}</p>
                </div>
                
                <div class="profile-info">
                    <h3 style="margin-bottom: 20px;">📊 Resumo da Conta</h3>
                    <div style="text-align: left;">
                        <p><strong>Saldo atual:</strong> ${dataManager.formatCurrency(stats.currentBalance)}</p>
                        <p><strong>Total ganho:</strong> ${dataManager.formatCurrency(stats.totalEarned)}</p>
                        <p><strong>Total gasto:</strong> ${dataManager.formatCurrency(stats.totalSpent)}</p>
                        <p><strong>Total sacado:</strong> ${dataManager.formatCurrency(stats.totalWithdrawn)}</p>
                        <p><strong>Rifas criadas:</strong> ${stats.totalRifasCreated}</p>
                        <p><strong>Participações:</strong> ${stats.totalParticipations}</p>
                    </div>
                </div>
                
                <div class="profile-info">
                    <button class="btn-secondary" onclick="app.logout()">Sair da Conta</button>
                    <button class="btn-secondary" onclick="app.clearData()" style="margin-top: 10px;">Limpar Dados (Teste)</button>
                </div>
            </div>
        `;
    }

    // Manipula criação de rifa
    handleCreateRifa() {
        const title = document.getElementById('rifa-title').value;
        const description = document.getElementById('rifa-description').value;
        const image = document.getElementById('rifa-image').value;
        const totalTickets = document.getElementById('rifa-tickets').value;

        if (!title || !description || !totalTickets) {
            this.showMessage('Preencha todos os campos obrigatórios!', 'error');
            return;
        }

        const rifaData = {
            title,
            description,
            image,
            totalTickets,
            creatorId: this.currentUser.id
        };

        const newRifa = dataManager.createRifa(rifaData);
        this.showMessage('Rifa criada com sucesso!', 'success');
        this.showPage('minhas');
    }

    // Abre modal para participar de rifa
    openParticipateModal(rifaId) {
        this.selectedRifaId = rifaId;
        const rifa = dataManager.getRifaById(rifaId);
        
        document.getElementById('rifa-details').innerHTML = `
            <h4>${rifa.title}</h4>
            <p>Valor por bilhete: ${dataManager.formatCurrency(rifa.ticketPrice)}</p>
            <p>Bilhetes disponíveis: ${rifa.totalTickets - rifa.soldTickets}</p>
        `;
        
        document.getElementById('ticket-quantity').value = 1;
        document.getElementById('ticket-quantity').max = rifa.totalTickets - rifa.soldTickets;
        this.updateTotalPrice();
        
        document.getElementById('participate-modal').classList.add('active');
    }

    // Atualiza preço total no modal
    updateTotalPrice() {
        const quantity = parseInt(document.getElementById('ticket-quantity').value) || 1;
        const total = quantity * 19.90;
        document.getElementById('total-price').textContent = total.toFixed(2);
    }

    // Confirma participação na rifa
    confirmParticipation() {
        const quantity = parseInt(document.getElementById('ticket-quantity').value);
        const rifa = dataManager.getRifaById(this.selectedRifaId);
        
        if (quantity > (rifa.totalTickets - rifa.soldTickets)) {
            this.showMessage('Quantidade de bilhetes não disponível!', 'error');
            return;
        }

        const success = dataManager.addParticipation(this.selectedRifaId, this.currentUser.id, quantity);
        
        if (success) {
            this.showMessage(`Participação confirmada! ${quantity} bilhete(s) adquirido(s).`, 'success');
            this.closeModal();
            this.loadPageContent(this.currentPage);
            this.updateUserBalance();
        } else {
            this.showMessage('Erro ao processar participação!', 'error');
        }
    }

    // Abre modal para encerrar rifa
    openFinishModal(rifaId) {
        this.selectedRifaId = rifaId;
        const rifa = dataManager.getRifaById(rifaId);
        const participations = dataManager.getRifaParticipations(rifaId);
        
        if (participations.length === 0) {
            this.showMessage('Não é possível encerrar uma rifa sem participantes!', 'error');
            return;
        }
        
        document.getElementById('finish-rifa-details').innerHTML = `
            <h4>${rifa.title}</h4>
            <p>Bilhetes vendidos: ${rifa.soldTickets}</p>
            <p>Participantes: ${participations.length}</p>
            <p>Arrecadação: ${dataManager.formatCurrency(rifa.soldTickets * rifa.ticketPrice)}</p>
        `;
        
        document.getElementById('finish-modal').classList.add('active');
    }

    // Confirma encerramento da rifa
    confirmFinishRifa() {
        const result = dataManager.finishRifa(this.selectedRifaId);
        
        if (result) {
            document.getElementById('winner-details').innerHTML = `
                <div style="text-align: center;">
                    <h4>🏆 ${result.rifa.title}</h4>
                    <p><strong>Vencedor:</strong> ${result.winner.email}</p>
                    <p><strong>Total de participantes:</strong> ${result.totalParticipants}</p>
                    <p><strong>Bilhetes vendidos:</strong> ${result.totalTicketsSold}</p>
                </div>
            `;
            
            this.closeModal();
            document.getElementById('result-modal').classList.add('active');
            this.loadPageContent(this.currentPage);
        } else {
            this.showMessage('Erro ao encerrar rifa!', 'error');
        }
    }

    // Solicita saque
    requestWithdrawal() {
        const user = dataManager.getCurrentUser();
        
        if (user.balance <= 0) {
            this.showMessage('Saldo insuficiente para saque!', 'error');
            return;
        }

        const amount = prompt(`Saldo disponível: ${dataManager.formatCurrency(user.balance)}\n\nDigite o valor para saque (Taxa de 8%):`);
        
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            return;
        }

        const withdrawalAmount = parseFloat(amount);
        
        if (withdrawalAmount > user.balance) {
            this.showMessage('Valor maior que o saldo disponível!', 'error');
            return;
        }

        const result = dataManager.requestWithdrawal(user.id, withdrawalAmount);
        
        if (result) {
            this.showMessage(
                `Saque solicitado!\nValor bruto: ${dataManager.formatCurrency(result.grossAmount)}\nTaxa (8%): ${dataManager.formatCurrency(result.fee)}\nValor líquido: ${dataManager.formatCurrency(result.netAmount)}`, 
                'success'
            );
            this.loadPageContent('carteira');
            this.updateUserBalance();
        } else {
            this.showMessage('Erro ao processar saque!', 'error');
        }
    }

    // Fecha modais
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Atualiza saldo do usuário no header
    updateUserBalance() {
        if (this.currentUser) {
            const user = dataManager.getCurrentUser();
            document.getElementById('user-balance').textContent = dataManager.formatCurrency(user.balance);
        }
    }

    // Exibe mensagens para o usuário
    showMessage(message, type = 'info') {
        // Remove mensagem anterior se existir
        const existingMessage = document.querySelector('.app-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'app-message';
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#667eea'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 3000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            max-width: 90%;
            text-align: center;
            white-space: pre-line;
        `;
        messageDiv.textContent = message;

        document.body.appendChild(messageDiv);

        // Remove mensagem após 4 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 4000);
    }

    // Logout
    logout() {
        dataManager.logout();
        this.currentUser = null;
        this.showLoginScreen();
        this.showMessage('Logout realizado com sucesso!', 'success');
    }

    // Limpa dados (para testes)
    clearData() {
        if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
            dataManager.clearAllData();
            this.logout();
            this.showMessage('Dados limpos com sucesso!', 'success');
        }
    }

    // Função para calcular tempo decorrido
    getTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Agora mesmo';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min atrás`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`;
        return `${Math.floor(diffInSeconds / 86400)}d atrás`;
    }

    // Função para ordenar rifas
    sortRifas(sortBy) {
        const container = document.getElementById('rifas-container');
        const rifaCards = Array.from(container.children);
        
        rifaCards.sort((a, b) => {
            const rifaIdA = parseInt(a.dataset.rifaId);
            const rifaIdB = parseInt(b.dataset.rifaId);
            const rifaA = dataManager.getRifaById(rifaIdA);
            const rifaB = dataManager.getRifaById(rifaIdB);
            
            switch(sortBy) {
                case 'newest':
                    return new Date(rifaB.createdAt) - new Date(rifaA.createdAt);
                case 'oldest':
                    return new Date(rifaA.createdAt) - new Date(rifaB.createdAt);
                case 'progress':
                    const progressA = (rifaA.soldTickets / rifaA.totalTickets) * 100;
                    const progressB = (rifaB.soldTickets / rifaB.totalTickets) * 100;
                    return progressB - progressA;
                case 'tickets':
                    return rifaB.totalTickets - rifaA.totalTickets;
                case 'price':
                    const arrecadacaoA = rifaA.soldTickets * rifaA.ticketPrice;
                    const arrecadacaoB = rifaB.soldTickets * rifaB.ticketPrice;
                    return arrecadacaoB - arrecadacaoA;
                default:
                    return 0;
            }
        });
        
        // Reordena os elementos no DOM
        rifaCards.forEach(card => container.appendChild(card));
    }

    // Função para buscar rifas
    searchRifas(searchTerm) {
        const container = document.getElementById('rifas-container');
        const rifaCards = Array.from(container.children);
        
        rifaCards.forEach(card => {
            const title = card.dataset.title;
            const rifaId = parseInt(card.dataset.rifaId);
            const rifa = dataManager.getRifaById(rifaId);
            const creator = dataManager.getUserById(rifa.creatorId);
            
            const searchableText = `${title} ${rifa.description.toLowerCase()} ${creator?.email.toLowerCase() || ''}`;
            
            if (searchTerm === '' || searchableText.includes(searchTerm.toLowerCase())) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Função para ver detalhes da rifa
    viewRifaDetails(rifaId) {
        const rifa = dataManager.getRifaById(rifaId);
        const creator = dataManager.getUserById(rifa.creatorId);
        const participations = dataManager.getRifaParticipations(rifaId);
        const progress = (rifa.soldTickets / rifa.totalTickets) * 100;
        
        // Calcula estatísticas dos participantes
        const participantStats = participations.reduce((stats, p) => {
            const user = dataManager.getUserById(p.userId);
            if (user) {
                stats.push({
                    email: user.email.split('@')[0],
                    tickets: p.ticketCount,
                    date: dataManager.formatDate(p.createdAt)
                });
            }
            return stats;
        }, []);

        const participantsHtml = participantStats.length > 0 ? 
            participantStats.map(p => `
                <div class="participant-item">
                    <span class="participant-name">${p.email}</span>
                    <span class="participant-tickets">${p.tickets} bilhete(s)</span>
                    <span class="participant-date">${p.date}</span>
                </div>
            `).join('') :
            '<p class="no-participants">Nenhum participante ainda</p>';

        document.getElementById('rifa-details').innerHTML = `
            <div class="rifa-detail-view">
                <div class="detail-image" style="background-image: url('${rifa.image}'); background-size: cover; background-position: center; height: 200px; border-radius: 12px; margin-bottom: 20px;">
                    ${!rifa.image.includes('http') ? '<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 4rem;">🎁</div>' : ''}
                </div>
                
                <h3>${rifa.title}</h3>
                <p style="color: #666; margin-bottom: 20px;">${rifa.description}</p>
                
                <div class="detail-stats">
                    <div class="stat-row">
                        <span>👤 Criador:</span>
                        <span>${creator?.email || 'Usuário removido'}</span>
                    </div>
                    <div class="stat-row">
                        <span>📅 Criada em:</span>
                        <span>${dataManager.formatDate(rifa.createdAt)}</span>
                    </div>
                    <div class="stat-row">
                        <span>💰 Valor do bilhete:</span>
                        <span>${dataManager.formatCurrency(rifa.ticketPrice)}</span>
                    </div>
                    <div class="stat-row">
                        <span>🎫 Total de bilhetes:</span>
                        <span>${rifa.totalTickets}</span>
                    </div>
                    <div class="stat-row">
                        <span>✅ Bilhetes vendidos:</span>
                        <span>${rifa.soldTickets}</span>
                    </div>
                    <div class="stat-row">
                        <span>📊 Progresso:</span>
                        <span>${progress.toFixed(1)}%</span>
                    </div>
                    <div class="stat-row">
                        <span>💵 Arrecadação:</span>
                        <span>${dataManager.formatCurrency(rifa.soldTickets * rifa.ticketPrice)}</span>
                    </div>
                </div>
                
                <div class="progress-bar" style="margin: 20px 0;">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                
                <h4 style="margin: 20px 0 10px 0;">👥 Participantes (${participations.length})</h4>
                <div class="participants-list" style="max-height: 200px; overflow-y: auto;">
                    ${participantsHtml}
                </div>
            </div>
        `;
        
        document.getElementById('participate-modal').classList.add('active');
    }
}

// Funções globais para serem chamadas pelo HTML
function showLoginForm() {
    app.showLoginForm();
}

function showRegisterForm() {
    app.showRegisterForm();
}

function showPage(page) {
    console.log('Função global showPage chamada:', page);
    if (window.app) {
        app.showPage(page);
    } else {
        console.error('App não inicializado ainda!');
    }
}

function closeModal() {
    app.closeModal();
}

function confirmParticipation() {
    app.confirmParticipation();
}

function confirmFinishRifa() {
    app.confirmFinishRifa();
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando aplicação...');
    try {
        window.app = new RifaApp();
        console.log('Aplicação inicializada com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
    }
});

// Fecha modais ao clicar fora deles
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
}); 