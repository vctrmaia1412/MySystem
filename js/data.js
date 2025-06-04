// Gerenciamento de dados usando localStorage
class DataManager {
    constructor() {
        this.initializeData();
    }

    // Inicializa dados padrão se não existirem
    initializeData() {
        if (!localStorage.getItem('rifaapp_users')) {
            this.setUsers(this.getDefaultUsers());
        }
        if (!localStorage.getItem('rifaapp_rifas')) {
            this.setRifas(this.getDefaultRifas());
        }
        if (!localStorage.getItem('rifaapp_transactions')) {
            this.setTransactions(this.getDefaultTransactions());
        }
        if (!localStorage.getItem('rifaapp_participations')) {
            this.setParticipations(this.getDefaultParticipations());
            // Gera números de bilhetes para as participações padrão
            this.generateTicketNumbersForExistingParticipations();
        }
        if (!localStorage.getItem('rifaapp_affiliates')) {
            this.setAffiliates(this.getDefaultAffiliates());
        }
    }

    // Usuários padrão
    getDefaultUsers() {
        return [
            {
                id: 1,
                email: 'admin@rifaapp.com',
                password: '123456',
                balance: 7279.52, // Saldo das 8 rifas: ganhos - saque
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                email: 'user@teste.com',
                password: '123456',
                balance: 150.00,
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                email: 'maria.silva@gmail.com',
                password: '123456',
                balance: 890.50,
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                email: 'joao.santos@hotmail.com',
                password: '123456',
                balance: 1250.75,
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                email: 'ana.costa@yahoo.com',
                password: '123456',
                balance: 567.30,
                createdAt: new Date().toISOString()
            },
            {
                id: 6,
                email: 'carlos.oliveira@outlook.com',
                password: '123456',
                balance: 2100.00,
                createdAt: new Date().toISOString()
            },
            {
                id: 7,
                email: 'fernanda.lima@gmail.com',
                password: '123456',
                balance: 780.25,
                createdAt: new Date().toISOString()
            }
        ];
    }

    // Transações padrão (exemplos) - Para as 8 rifas do usuário admin
    getDefaultTransactions() {
        const now = new Date();
        return [
            // Ganhos das rifas finalizadas
            {
                id: 1,
                userId: 1,
                type: 'earning',
                amount: 2754.60, // 150 bilhetes * 19.90 * 0.92
                description: 'Venda de bilhetes: iPhone 14 Pro',
                rifaId: 2,
                createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                userId: 1,
                type: 'earning',
                amount: 1100.40, // 60 bilhetes * 19.90 * 0.92
                description: 'Venda de bilhetes: Kit Churrasco Premium',
                rifaId: 5,
                createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString()
            },
            // Saque realizado
            {
                id: 3,
                userId: 1,
                type: 'withdrawal',
                amount: -2000.00,
                description: 'Saque solicitado (Taxa: R$ 160,00)',
                createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            // Ganhos parciais das rifas ativas
            {
                id: 4,
                userId: 1,
                type: 'earning',
                amount: 1430.04, // 78 bilhetes * 19.90 * 0.92
                description: 'Venda de bilhetes: PlayStation 5',
                rifaId: 1,
                createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 5,
                userId: 1,
                type: 'earning',
                amount: 1228.04, // 67 bilhetes * 19.90 * 0.92
                description: 'Venda de bilhetes: Smart TV 55" 4K Samsung',
                rifaId: 3,
                createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 6,
                userId: 1,
                type: 'earning',
                amount: 421.64, // 23 bilhetes * 19.90 * 0.92
                description: 'Venda de bilhetes: Air Fryer Philco 4L',
                rifaId: 4,
                createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 7,
                userId: 1,
                type: 'earning',
                amount: 861.44, // 47 bilhetes * 19.90 * 0.92
                description: 'Venda de bilhetes: Apple Watch Series 8',
                rifaId: 6,
                createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 8,
                userId: 1,
                type: 'earning',
                amount: 2860.32, // 156 bilhetes * 19.90 * 0.92
                description: 'Venda de bilhetes: Notebook Gamer Acer Nitro 5',
                rifaId: 7,
                createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 9,
                userId: 1,
                type: 'earning',
                amount: 623.44, // 34 bilhetes * 19.90 * 0.92
                description: 'Venda de bilhetes: Caixa de Som JBL Flip 5',
                rifaId: 8,
                createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
    }

    // Afiliados padrão (exemplos)
    getDefaultAffiliates() {
        const now = new Date();
        return [
            {
                id: 1,
                rifaId: 1, // PlayStation 5
                affiliateId: 3, // Maria
                affiliateEmail: 'maria.silva@gmail.com',
                type: 'percentage',
                value: 15,
                totalSales: 1552.20, // 78 bilhetes * 19.90
                totalEarnings: 232.83, // 15% de 1552.20
                createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                rifaId: 3, // Smart TV
                affiliateId: 4, // João
                affiliateEmail: 'joao.santos@hotmail.com',
                type: 'fixed',
                value: 3.50,
                totalSales: 1333.30, // 67 bilhetes * 19.90
                totalEarnings: 234.50, // 67 bilhetes * 3.50
                createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                rifaId: 7, // Notebook Gamer
                affiliateId: 5, // Ana
                affiliateEmail: 'ana.costa@yahoo.com',
                type: 'percentage',
                value: 12,
                totalSales: 3104.40, // 156 bilhetes * 19.90
                totalEarnings: 372.53, // 12% de 3104.40
                createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 4,
                rifaId: 8, // Caixa de Som JBL
                affiliateId: 6, // Carlos
                affiliateEmail: 'carlos.oliveira@outlook.com',
                type: 'fixed',
                value: 2.00,
                totalSales: 676.60, // 34 bilhetes * 19.90
                totalEarnings: 68.00, // 34 bilhetes * 2.00
                createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
    }

    // Rifas padrão (exemplos) - 8 rifas para o usuário admin (ID 1)
    getDefaultRifas() {
        const now = new Date();
        return [
            // Rifa 1 - Ativa com bom progresso
            {
                id: 1,
                title: 'PlayStation 5',
                description: 'Console PlayStation 5 novo na caixa, com controle DualSense e todos os cabos.',
                image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
                ticketPrice: 19.90,
                totalTickets: 100,
                soldTickets: 100,
                creatorId: 1,
                status: 'active',
                createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                participants: [],
                // Sistema de afiliados
                affiliateEnabled: true,
                affiliateType: 'percentage',
                affiliateValue: 15,
                affiliateEmail: 'maria.silva@gmail.com',
                affiliateId: 3
            },
            // Rifa 2 - Finalizada
            {
                id: 2,
                title: 'iPhone 14 Pro',
                description: 'iPhone 14 Pro 128GB cor Roxo Profundo, lacrado com garantia Apple.',
                image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
                ticketPrice: 19.90,
                totalTickets: 150,
                soldTickets: 150,
                creatorId: 1,
                status: 'finished',
                winnerId: 2,
                createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                finishedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            // Rifa 3 - Ativa com progresso médio
            {
                id: 3,
                title: 'Smart TV 55" 4K Samsung',
                description: 'Smart TV Samsung 55 polegadas 4K UHD, HDR, Tizen OS, controle remoto por voz.',
                image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
                ticketPrice: 19.90,
                totalTickets: 120,
                soldTickets: 100,
                creatorId: 1,
                status: 'active',
                createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                participants: [],
                // Sistema de afiliados
                affiliateEnabled: true,
                affiliateType: 'fixed',
                affiliateValue: 3.50,
                affiliateEmail: 'joao.santos@hotmail.com',
                affiliateId: 4
            },
            // Rifa 4 - Ativa com poucos bilhetes vendidos
            {
                id: 4,
                title: 'Air Fryer Philco 4L',
                description: 'Fritadeira elétrica sem óleo Philco 4 litros, 1500W, timer digital, antiaderente.',
                image: 'https://images.unsplash.com/photo-1585515656643-1e4d8f9b5b7a?w=400',
                ticketPrice: 19.90,
                totalTickets: 80,
                soldTickets: 48,
                creatorId: 1,
                status: 'active',
                createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            // Rifa 5 - Finalizada
            {
                id: 5,
                title: 'Kit Churrasco Premium',
                description: 'Kit completo para churrasco: churrasqueira portátil, utensílios, temperos e avental.',
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
                ticketPrice: 19.90,
                totalTickets: 60,
                soldTickets: 60,
                creatorId: 1,
                status: 'finished',
                winnerId: 2,
                createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                finishedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            // Rifa 6 - Ativa quase esgotada
            {
                id: 6,
                title: 'Apple Watch Series 8',
                description: 'Apple Watch Series 8 45mm GPS, pulseira esportiva, sensor de oxigênio no sangue.',
                image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400',
                ticketPrice: 19.90,
                totalTickets: 50,
                soldTickets: 50,
                creatorId: 1,
                status: 'active',
                createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            // Rifa 7 - Ativa com bom progresso
            {
                id: 7,
                title: 'Notebook Gamer Acer Nitro 5',
                description: 'Notebook Gamer Acer Nitro 5, Intel i5, 16GB RAM, GTX 1650, SSD 512GB.',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
                ticketPrice: 19.90,
                totalTickets: 200,
                soldTickets: 200,
                creatorId: 1,
                status: 'active',
                createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                participants: [],
                // Sistema de afiliados
                affiliateEnabled: true,
                affiliateType: 'percentage',
                affiliateValue: 12,
                affiliateEmail: 'ana.costa@yahoo.com',
                affiliateId: 5
            },
            // Rifa 8 - Ativa recente
            {
                id: 8,
                title: 'Caixa de Som JBL Flip 5',
                description: 'Caixa de som portátil JBL Flip 5, Bluetooth, à prova d\'água, 12h de bateria.',
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
                ticketPrice: 19.90,
                totalTickets: 70,
                soldTickets: 57,
                creatorId: 1,
                status: 'active',
                createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                participants: [],
                // Sistema de afiliados
                affiliateEnabled: true,
                affiliateType: 'fixed',
                affiliateValue: 2.00,
                affiliateEmail: 'carlos.oliveira@outlook.com',
                affiliateId: 6
            },
            
            // === RIFAS DE OUTROS USUÁRIOS PARA O HOME ===
            
            // Rifas da Maria (ID 3)
            {
                id: 9,
                title: 'Micro-ondas Electrolux 20L',
                description: 'Micro-ondas Electrolux 20 litros, 10 níveis de potência, timer digital, função descongelar.',
                image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400',
                ticketPrice: 19.90,
                totalTickets: 70,
                soldTickets: 65,
                creatorId: 3,
                status: 'active',
                createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            {
                id: 10,
                title: 'Kit Maquiagem Profissional',
                description: 'Kit completo de maquiagem com 50 itens: bases, sombras, batons, pincéis e estojo.',
                image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
                ticketPrice: 19.90,
                totalTickets: 100,
                soldTickets: 90,
                creatorId: 3,
                status: 'active',
                createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            
            // Rifas do João (ID 4)
            {
                id: 11,
                title: 'Bicicleta Mountain Bike Aro 29',
                description: 'Bicicleta MTB aro 29, 21 marchas Shimano, freios a disco, suspensão dianteira.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                ticketPrice: 19.90,
                totalTickets: 150,
                soldTickets: 134,
                creatorId: 4,
                status: 'active',
                createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            {
                id: 12,
                title: 'Churrasqueira Elétrica Mondial',
                description: 'Churrasqueira elétrica Mondial, grill antiaderente, controle de temperatura, 1800W.',
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
                ticketPrice: 19.90,
                totalTickets: 45,
                soldTickets: 45,
                creatorId: 4,
                status: 'finished',
                winnerId: 2,
                createdAt: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString(),
                finishedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            
            // Rifas da Ana (ID 5)
            {
                id: 13,
                title: 'Aspirador de Pó Wap Turbo',
                description: 'Aspirador de pó WAP 1400W, filtro HEPA, função soprador, mangueira 1,5m.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                ticketPrice: 19.90,
                totalTickets: 70,
                soldTickets: 54,
                creatorId: 5,
                status: 'active',
                createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            {
                id: 14,
                title: 'Perfume Feminino Importado 100ml',
                description: 'Perfume feminino importado 100ml, fragrância floral, longa duração, original lacrado.',
                image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
                ticketPrice: 19.90,
                totalTickets: 55,
                soldTickets: 55,
                creatorId: 5,
                status: 'active',
                createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            
            // Rifas do Carlos (ID 6)
            {
                id: 15,
                title: 'Tablet Samsung Galaxy Tab A8',
                description: 'Tablet Samsung Galaxy Tab A8, tela 10.5", 64GB, Wi-Fi, Android 11, câmera 8MP.',
                image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',
                ticketPrice: 19.90,
                totalTickets: 120,
                soldTickets: 96,
                creatorId: 6,
                status: 'active',
                createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            {
                id: 16,
                title: 'Tênis Adidas Ultraboost 22',
                description: 'Tênis Adidas Ultraboost 22 masculino, tamanho 42, tecnologia Boost, cor preto/branco.',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                ticketPrice: 19.90,
                totalTickets: 90,
                soldTickets: 90,
                creatorId: 6,
                status: 'finished',
                winnerId: 3,
                createdAt: new Date(now.getTime() - 22 * 24 * 60 * 60 * 1000).toISOString(),
                finishedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            
            // Rifas da Fernanda (ID 7)
            {
                id: 17,
                title: 'Máquina de Café Nespresso Inissia',
                description: 'Máquina de café Nespresso Inissia, 19 bar de pressão, aquecimento rápido, com 16 cápsulas.',
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
                ticketPrice: 19.90,
                totalTickets: 65,
                soldTickets: 65,
                creatorId: 7,
                status: 'active',
                createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            {
                id: 18,
                title: 'Smartwatch Xiaomi Mi Band 7',
                description: 'Smartwatch Xiaomi Mi Band 7, monitor cardíaco, GPS, 14 dias de bateria, à prova d\'água.',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                ticketPrice: 19.90,
                totalTickets: 75,
                soldTickets: 59,
                creatorId: 7,
                status: 'active',
                createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            },
            
            // Rifa extra do usuário teste (ID 2)
            {
                id: 19,
                title: 'Console Nintendo Switch Lite',
                description: 'Nintendo Switch Lite cor turquesa, portátil, com jogo Mario Kart 8 Deluxe incluso.',
                image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
                ticketPrice: 19.90,
                totalTickets: 150,
                soldTickets: 146,
                creatorId: 2,
                status: 'active',
                createdAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString(),
                participants: []
            }
        ];
    }

    // Métodos para usuários
    getUsers() {
        return JSON.parse(localStorage.getItem('rifaapp_users') || '[]');
    }

    setUsers(users) {
        localStorage.setItem('rifaapp_users', JSON.stringify(users));
    }

    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    }

    createUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: Date.now(),
            email: userData.email,
            password: userData.password,
            balance: 0.00,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        this.setUsers(users);
        return newUser;
    }

    updateUserBalance(userId, newBalance) {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            users[userIndex].balance = newBalance;
            this.setUsers(users);
            return true;
        }
        return false;
    }

    // Métodos para rifas
    getRifas() {
        return JSON.parse(localStorage.getItem('rifaapp_rifas') || '[]');
    }

    setRifas(rifas) {
        localStorage.setItem('rifaapp_rifas', JSON.stringify(rifas));
    }

    getRifaById(id) {
        const rifas = this.getRifas();
        return rifas.find(rifa => rifa.id === id);
    }

    getActiveRifas() {
        const rifas = this.getRifas();
        return rifas.filter(rifa => rifa.status === 'active');
    }

    getUserRifas(userId) {
        const rifas = this.getRifas();
        return rifas.filter(rifa => rifa.creatorId === userId);
    }

    createRifa(rifaData) {
        const rifas = this.getRifas();
        const newRifa = {
            id: Date.now(),
            title: rifaData.title,
            description: rifaData.description,
            image: rifaData.image || 'https://via.placeholder.com/400x200?text=Sem+Imagem',
            ticketPrice: rifaData.ticketPrice || 19.90, // Preço variável
            totalTickets: parseInt(rifaData.totalTickets),
            soldTickets: 0,
            creatorId: rifaData.creatorId,
            status: 'active',
            createdAt: new Date().toISOString(),
            participants: [],
            // Sistema de afiliados
            affiliateEnabled: rifaData.affiliateEnabled || false,
            affiliateType: rifaData.affiliateType || 'percentage', // 'percentage' ou 'fixed'
            affiliateValue: rifaData.affiliateValue || 0,
            affiliateEmail: rifaData.affiliateEmail || null,
            affiliateId: rifaData.affiliateId || null
        };
        rifas.push(newRifa);
        this.setRifas(rifas);
        return newRifa;
    }

    updateRifa(rifaId, updates) {
        const rifas = this.getRifas();
        const rifaIndex = rifas.findIndex(rifa => rifa.id === rifaId);
        if (rifaIndex !== -1) {
            rifas[rifaIndex] = { ...rifas[rifaIndex], ...updates };
            this.setRifas(rifas);
            return rifas[rifaIndex];
        }
        return null;
    }

    // Participações padrão (exemplos) - Para tornar o sistema mais realista
    getDefaultParticipations() {
        const now = new Date();
        return [
            // Participações na Rifa 1 - PlayStation 5 (78 bilhetes vendidos)
            { id: 1, rifaId: 1, userId: 2, ticketCount: 5, totalPaid: 99.50, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 2, rifaId: 1, userId: 3, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 3, rifaId: 1, userId: 4, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 4, rifaId: 1, userId: 5, ticketCount: 3, totalPaid: 59.70, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 5, rifaId: 1, userId: 6, ticketCount: 15, totalPaid: 298.50, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 6, rifaId: 1, userId: 7, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 7, rifaId: 1, userId: 2, ticketCount: 4, totalPaid: 79.60, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 8, rifaId: 1, userId: 4, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 9, rifaId: 1, userId: 5, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString() },
            { id: 10, rifaId: 1, userId: 6, ticketCount: 2, totalPaid: 39.80, createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },
            { id: 11, rifaId: 1, userId: 3, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString() },

            // Participações na Rifa 2 - iPhone 14 Pro (150 bilhetes - FINALIZADA)
            { id: 12, rifaId: 2, userId: 2, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 13, rifaId: 2, userId: 3, ticketCount: 15, totalPaid: 298.50, createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 14, rifaId: 2, userId: 4, ticketCount: 20, totalPaid: 398.00, createdAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 15, rifaId: 2, userId: 5, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 16, rifaId: 2, userId: 6, ticketCount: 25, totalPaid: 497.50, createdAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 17, rifaId: 2, userId: 7, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 18, rifaId: 2, userId: 2, ticketCount: 18, totalPaid: 358.20, createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 19, rifaId: 2, userId: 3, ticketCount: 22, totalPaid: 437.80, createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 20, rifaId: 2, userId: 4, ticketCount: 20, totalPaid: 398.00, createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString() },

            // Participações na Rifa 3 - Smart TV (67 bilhetes vendidos)
            { id: 21, rifaId: 3, userId: 2, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 22, rifaId: 3, userId: 3, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 23, rifaId: 3, userId: 4, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 24, rifaId: 3, userId: 5, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 25, rifaId: 3, userId: 6, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 26, rifaId: 3, userId: 7, ticketCount: 5, totalPaid: 99.50, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 27, rifaId: 3, userId: 2, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 28, rifaId: 3, userId: 4, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString() },

            // Participações na Rifa 4 - Air Fryer (23 bilhetes vendidos)
            { id: 29, rifaId: 4, userId: 2, ticketCount: 3, totalPaid: 59.70, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 30, rifaId: 4, userId: 3, ticketCount: 5, totalPaid: 99.50, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 31, rifaId: 4, userId: 5, ticketCount: 4, totalPaid: 79.60, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 32, rifaId: 4, userId: 6, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 33, rifaId: 4, userId: 7, ticketCount: 5, totalPaid: 99.50, createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },

            // Participações na Rifa 5 - Kit Churrasco (60 bilhetes - FINALIZADA)
            { id: 34, rifaId: 5, userId: 2, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 35, rifaId: 5, userId: 3, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 19 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 36, rifaId: 5, userId: 4, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 37, rifaId: 5, userId: 5, ticketCount: 15, totalPaid: 298.50, createdAt: new Date(now.getTime() - 17 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 38, rifaId: 5, userId: 6, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 16 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 39, rifaId: 5, userId: 7, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString() },

            // Participações na Rifa 6 - Apple Watch (47 bilhetes vendidos)
            { id: 40, rifaId: 6, userId: 2, ticketCount: 4, totalPaid: 79.60, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 41, rifaId: 6, userId: 3, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 42, rifaId: 6, userId: 4, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 43, rifaId: 6, userId: 5, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString() },
            { id: 44, rifaId: 6, userId: 6, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString() },
            { id: 45, rifaId: 6, userId: 7, ticketCount: 5, totalPaid: 99.50, createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },
            { id: 46, rifaId: 6, userId: 2, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString() },

            // Participações na Rifa 7 - Notebook Gamer (156 bilhetes vendidos)
            { id: 47, rifaId: 7, userId: 2, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 48, rifaId: 7, userId: 3, ticketCount: 18, totalPaid: 358.20, createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 49, rifaId: 7, userId: 4, ticketCount: 25, totalPaid: 497.50, createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 50, rifaId: 7, userId: 5, ticketCount: 15, totalPaid: 298.50, createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 51, rifaId: 7, userId: 6, ticketCount: 20, totalPaid: 398.00, createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 52, rifaId: 7, userId: 7, ticketCount: 14, totalPaid: 278.60, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 53, rifaId: 7, userId: 2, ticketCount: 16, totalPaid: 318.40, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 54, rifaId: 7, userId: 3, ticketCount: 22, totalPaid: 437.80, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 55, rifaId: 7, userId: 4, ticketCount: 14, totalPaid: 278.60, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },

            // Participações na Rifa 8 - Caixa de Som JBL (34 bilhetes vendidos)
            { id: 56, rifaId: 8, userId: 2, ticketCount: 3, totalPaid: 59.70, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 57, rifaId: 8, userId: 3, ticketCount: 5, totalPaid: 99.50, createdAt: new Date(now.getTime() - 20 * 60 * 60 * 1000).toISOString() },
            { id: 58, rifaId: 8, userId: 4, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString() },
            { id: 59, rifaId: 8, userId: 5, ticketCount: 4, totalPaid: 79.60, createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString() },
            { id: 60, rifaId: 8, userId: 6, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },
            { id: 61, rifaId: 8, userId: 7, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString() },

            // Participações em rifas de outros usuários (para dar mais realismo)
            // Rifa 9 - Micro-ondas da Maria
            { id: 62, rifaId: 9, userId: 1, ticketCount: 5, totalPaid: 99.50, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 63, rifaId: 9, userId: 2, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 64, rifaId: 9, userId: 4, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },

            // Rifa 11 - Bicicleta do João
            { id: 65, rifaId: 11, userId: 1, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 66, rifaId: 11, userId: 3, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 67, rifaId: 11, userId: 5, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },

            // Rifa 15 - Tablet do Carlos
            { id: 68, rifaId: 15, userId: 1, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 69, rifaId: 15, userId: 2, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 70, rifaId: 15, userId: 7, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },

            // === MAIS 20 PARTICIPAÇÕES PARA DEIXAR MAIS INTERESSANTE ===

            // Mais participações na Rifa 1 - PlayStation 5 (chegando a 100 bilhetes)
            { id: 71, rifaId: 1, userId: 7, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
            { id: 72, rifaId: 1, userId: 2, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() },
            { id: 73, rifaId: 1, userId: 4, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString() },

            // Mais participações na Rifa 3 - Smart TV (chegando próximo de 100)
            { id: 74, rifaId: 3, userId: 3, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString() },
            { id: 75, rifaId: 3, userId: 5, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },
            { id: 76, rifaId: 3, userId: 6, ticketCount: 13, totalPaid: 258.70, createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString() },

            // Mais participações na Rifa 4 - Air Fryer (aumentando interesse)
            { id: 77, rifaId: 4, userId: 3, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString() },
            { id: 78, rifaId: 4, userId: 4, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString() },
            { id: 79, rifaId: 4, userId: 5, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() },

            // Mais participações na Rifa 6 - Apple Watch (esgotando)
            { id: 80, rifaId: 6, userId: 3, ticketCount: 3, totalPaid: 59.70, createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() },

            // Mais participações na Rifa 7 - Notebook Gamer (chegando ao limite)
            { id: 81, rifaId: 7, userId: 5, ticketCount: 18, totalPaid: 358.20, createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString() },
            { id: 82, rifaId: 7, userId: 6, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString() },
            { id: 83, rifaId: 7, userId: 7, ticketCount: 14, totalPaid: 278.60, createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() },

            // Mais participações na Rifa 8 - Caixa de Som JBL
            { id: 84, rifaId: 8, userId: 2, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
            { id: 85, rifaId: 8, userId: 4, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() },
            { id: 86, rifaId: 8, userId: 5, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString() },

            // Participações em rifas de outros usuários (mais realismo)
            // Rifa 9 - Micro-ondas da Maria (mais participações)
            { id: 87, rifaId: 9, userId: 3, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString() },
            { id: 88, rifaId: 9, userId: 5, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString() },
            { id: 89, rifaId: 9, userId: 6, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },

            // Rifa 10 - Kit Maquiagem da Maria
            { id: 90, rifaId: 10, userId: 1, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 91, rifaId: 10, userId: 2, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 92, rifaId: 10, userId: 4, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },

            // Rifa 11 - Bicicleta do João (mais participações)
            { id: 93, rifaId: 11, userId: 2, ticketCount: 15, totalPaid: 298.50, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 94, rifaId: 11, userId: 4, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 95, rifaId: 11, userId: 6, ticketCount: 18, totalPaid: 358.20, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },

            // Rifa 13 - Aspirador da Ana
            { id: 96, rifaId: 13, userId: 1, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 97, rifaId: 13, userId: 3, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 98, rifaId: 13, userId: 7, ticketCount: 6, totalPaid: 119.40, createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString() },

            // Rifa 14 - Perfume da Ana
            { id: 99, rifaId: 14, userId: 2, ticketCount: 4, totalPaid: 79.60, createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },

            // Rifa 17 - Máquina de Café da Fernanda
            { id: 100, rifaId: 17, userId: 1, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 101, rifaId: 17, userId: 3, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString() },
            { id: 102, rifaId: 17, userId: 5, ticketCount: 10, totalPaid: 199.00, createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString() },

            // Rifa 18 - Smartwatch da Fernanda
            { id: 103, rifaId: 18, userId: 1, ticketCount: 7, totalPaid: 139.30, createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 104, rifaId: 18, userId: 2, ticketCount: 9, totalPaid: 179.10, createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() },

            // Rifa 19 - Nintendo Switch do usuário teste
            { id: 105, rifaId: 19, userId: 1, ticketCount: 12, totalPaid: 238.80, createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 106, rifaId: 19, userId: 3, ticketCount: 8, totalPaid: 159.20, createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 107, rifaId: 19, userId: 4, ticketCount: 14, totalPaid: 278.60, createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 108, rifaId: 19, userId: 5, ticketCount: 11, totalPaid: 218.90, createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 109, rifaId: 19, userId: 6, ticketCount: 13, totalPaid: 258.70, createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { id: 110, rifaId: 19, userId: 7, ticketCount: 15, totalPaid: 298.50, createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() }
        ];
    }

    // Métodos para participações
    getParticipations() {
        return JSON.parse(localStorage.getItem('rifaapp_participations') || '[]');
    }

    setParticipations(participations) {
        localStorage.setItem('rifaapp_participations', JSON.stringify(participations));
    }

    addParticipation(rifaId, userId, ticketCount) {
        const participations = this.getParticipations();
        const rifas = this.getRifas();
        
        // Encontra a rifa
        const rifaIndex = rifas.findIndex(rifa => rifa.id === rifaId);
        if (rifaIndex === -1) return false;

        // Verifica se há bilhetes disponíveis
        const rifa = rifas[rifaIndex];
        if (rifa.soldTickets + ticketCount > rifa.totalTickets) {
            return false;
        }

        // Gera números específicos de bilhetes
        const soldNumbers = this.getSoldTicketNumbers(rifaId);
        const ticketNumbers = this.generateTicketNumbers(rifaId, ticketCount, soldNumbers);

        // Cria a participação
        const participation = {
            id: Date.now(),
            rifaId: rifaId,
            userId: userId,
            ticketCount: ticketCount,
            ticketNumbers: ticketNumbers,
            totalPaid: ticketCount * rifa.ticketPrice,
            createdAt: new Date().toISOString()
        };

        participations.push(participation);
        this.setParticipations(participations);

        // Atualiza a rifa
        rifas[rifaIndex].soldTickets += ticketCount;
        this.setRifas(rifas);

        // Adiciona transação
        this.addTransaction({
            userId: userId,
            type: 'participation',
            amount: -participation.totalPaid,
            description: `Participação na rifa: ${rifa.title}`,
            rifaId: rifaId
        });

        // Processa comissão do afiliado (se houver)
        const affiliateCommission = this.processAffiliateCommission(rifaId, participation.totalPaid);

        // Calcula receita para o criador da rifa (descontando taxa da plataforma e comissão do afiliado)
        let creatorEarning = participation.totalPaid * 0.92; // 8% de taxa da plataforma
        if (affiliateCommission) {
            creatorEarning -= affiliateCommission; // Desconta comissão do afiliado
        }

        this.addTransaction({
            userId: rifa.creatorId,
            type: 'earning',
            amount: creatorEarning,
            description: `Venda de bilhetes: ${rifa.title}${affiliateCommission ? ` (Comissão afiliado: ${this.formatCurrency(affiliateCommission)})` : ''}`,
            rifaId: rifaId
        });

        // Atualiza saldo do criador
        const creator = this.getUserById(rifa.creatorId);
        if (creator) {
            this.updateUserBalance(rifa.creatorId, creator.balance + creatorEarning);
        }

        return true;
    }

    getUserParticipations(userId) {
        const participations = this.getParticipations();
        return participations.filter(p => p.userId === userId);
    }

    getRifaParticipations(rifaId) {
        const participations = this.getParticipations();
        return participations.filter(p => p.rifaId === rifaId);
    }

    // Gera números de bilhetes específicos para uma participação
    generateTicketNumbers(rifaId, ticketCount, excludeNumbers = []) {
        const rifa = this.getRifaById(rifaId);
        if (!rifa) return [];

        const availableNumbers = [];
        for (let i = 1; i <= rifa.totalTickets; i++) {
            if (!excludeNumbers.includes(i)) {
                availableNumbers.push(i);
            }
        }

        // Embaralha os números disponíveis
        for (let i = availableNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
        }

        return availableNumbers.slice(0, ticketCount);
    }

    // Obtém todos os números de bilhetes já vendidos para uma rifa
    getSoldTicketNumbers(rifaId) {
        const participations = this.getRifaParticipations(rifaId);
        const soldNumbers = [];
        
        participations.forEach(participation => {
            if (participation.ticketNumbers) {
                soldNumbers.push(...participation.ticketNumbers);
            }
        });
        
        return soldNumbers;
    }

    // Obtém números de bilhetes disponíveis para uma rifa
    getAvailableTicketNumbers(rifaId) {
        const rifa = this.getRifaById(rifaId);
        if (!rifa) return [];

        const soldNumbers = this.getSoldTicketNumbers(rifaId);
        const availableNumbers = [];
        
        for (let i = 1; i <= rifa.totalTickets; i++) {
            if (!soldNumbers.includes(i)) {
                availableNumbers.push(i);
            }
        }
        
        return availableNumbers;
    }

    // Gera números de bilhetes para todas as participações existentes (para dados padrão)
    generateTicketNumbersForExistingParticipations() {
        const participations = this.getParticipations();
        const updatedParticipations = [];
        
        // Agrupa participações por rifa
        const participationsByRifa = {};
        participations.forEach(participation => {
            if (!participationsByRifa[participation.rifaId]) {
                participationsByRifa[participation.rifaId] = [];
            }
            participationsByRifa[participation.rifaId].push(participation);
        });

        // Gera números para cada rifa
        Object.keys(participationsByRifa).forEach(rifaId => {
            const rifaParticipations = participationsByRifa[rifaId];
            const usedNumbers = [];
            
            rifaParticipations.forEach(participation => {
                if (!participation.ticketNumbers) {
                    const ticketNumbers = this.generateTicketNumbers(
                        parseInt(rifaId), 
                        participation.ticketCount, 
                        usedNumbers
                    );
                    participation.ticketNumbers = ticketNumbers;
                    usedNumbers.push(...ticketNumbers);
                }
                updatedParticipations.push(participation);
            });
        });

        this.setParticipations(updatedParticipations);
    }

    // Métodos para transações
    getTransactions() {
        return JSON.parse(localStorage.getItem('rifaapp_transactions') || '[]');
    }

    setTransactions(transactions) {
        localStorage.setItem('rifaapp_transactions', JSON.stringify(transactions));
    }

    addTransaction(transactionData) {
        const transactions = this.getTransactions();
        const newTransaction = {
            id: Date.now(),
            userId: transactionData.userId,
            type: transactionData.type, // 'participation', 'earning', 'withdrawal'
            amount: transactionData.amount,
            description: transactionData.description,
            rifaId: transactionData.rifaId || null,
            createdAt: new Date().toISOString()
        };
        transactions.push(newTransaction);
        this.setTransactions(transactions);
        return newTransaction;
    }

    getUserTransactions(userId) {
        const transactions = this.getTransactions();
        return transactions.filter(t => t.userId === userId)
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Método para finalizar rifa e sortear vencedor
    finishRifa(rifaId) {
        const rifa = this.getRifaById(rifaId);
        if (!rifa || rifa.status !== 'active') {
            return null;
        }

        const participations = this.getRifaParticipations(rifaId);
        if (participations.length === 0) {
            return null;
        }

        // Cria array com todos os bilhetes vendidos
        const tickets = [];
        participations.forEach(participation => {
            for (let i = 0; i < participation.ticketCount; i++) {
                tickets.push(participation.userId);
            }
        });

        // Sorteia um bilhete aleatório
        const winnerUserId = tickets[Math.floor(Math.random() * tickets.length)];
        const winner = this.getUserById(winnerUserId);

        // Atualiza status da rifa
        this.updateRifa(rifaId, {
            status: 'finished',
            winnerId: winnerUserId,
            finishedAt: new Date().toISOString()
        });

        return {
            rifa: rifa,
            winner: winner,
            totalParticipants: participations.length,
            totalTicketsSold: rifa.soldTickets
        };
    }

    // Método para saque
    requestWithdrawal(userId, amount) {
        const user = this.getUserById(userId);
        if (!user || user.balance < amount) {
            return false;
        }

        const fee = amount * 0.08; // Taxa de 8%
        const netAmount = amount - fee;

        // Atualiza saldo do usuário
        this.updateUserBalance(userId, user.balance - amount);

        // Adiciona transação
        this.addTransaction({
            userId: userId,
            type: 'withdrawal',
            amount: -amount,
            description: `Saque solicitado (Taxa: R$ ${fee.toFixed(2)})`
        });

        return {
            grossAmount: amount,
            fee: fee,
            netAmount: netAmount
        };
    }

    // Método para obter estatísticas
    getUserStats(userId) {
        const transactions = this.getUserTransactions(userId);
        const participations = this.getUserParticipations(userId);
        const rifas = this.getUserRifas(userId);

        const totalSpent = transactions
            .filter(t => t.type === 'participation')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const totalEarned = transactions
            .filter(t => t.type === 'earning')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalWithdrawn = transactions
            .filter(t => t.type === 'withdrawal')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        return {
            totalRifasCreated: rifas.length,
            totalParticipations: participations.length,
            totalSpent: totalSpent,
            totalEarned: totalEarned,
            totalWithdrawn: totalWithdrawn,
            currentBalance: this.getUserById(userId)?.balance || 0
        };
    }

    // Métodos para afiliados
    getAffiliates() {
        return JSON.parse(localStorage.getItem('rifaapp_affiliates') || '[]');
    }

    setAffiliates(affiliates) {
        localStorage.setItem('rifaapp_affiliates', JSON.stringify(affiliates));
    }

    addAffiliateToRifa(rifaId, affiliateData) {
        const rifas = this.getRifas();
        const rifaIndex = rifas.findIndex(rifa => rifa.id === rifaId);
        if (rifaIndex === -1) return false;

        // Verifica se o email do afiliado existe
        const affiliateUser = this.getUserByEmail(affiliateData.email);
        if (!affiliateUser) return false;

        // Atualiza a rifa com dados do afiliado
        rifas[rifaIndex].affiliateEnabled = true;
        rifas[rifaIndex].affiliateType = affiliateData.type;
        rifas[rifaIndex].affiliateValue = affiliateData.value;
        rifas[rifaIndex].affiliateEmail = affiliateData.email;
        rifas[rifaIndex].affiliateId = affiliateUser.id;

        this.setRifas(rifas);

        // Cria registro de afiliado
        const affiliates = this.getAffiliates();
        const affiliateRecord = {
            id: Date.now(),
            rifaId: rifaId,
            affiliateId: affiliateUser.id,
            affiliateEmail: affiliateData.email,
            type: affiliateData.type,
            value: affiliateData.value,
            totalSales: 0,
            totalEarnings: 0,
            createdAt: new Date().toISOString()
        };

        affiliates.push(affiliateRecord);
        this.setAffiliates(affiliates);

        return true;
    }

    removeAffiliateFromRifa(rifaId) {
        const rifas = this.getRifas();
        const rifaIndex = rifas.findIndex(rifa => rifa.id === rifaId);
        if (rifaIndex === -1) return false;

        // Remove afiliado da rifa
        rifas[rifaIndex].affiliateEnabled = false;
        rifas[rifaIndex].affiliateType = 'percentage';
        rifas[rifaIndex].affiliateValue = 0;
        rifas[rifaIndex].affiliateEmail = null;
        rifas[rifaIndex].affiliateId = null;

        this.setRifas(rifas);

        // Remove registro de afiliado
        const affiliates = this.getAffiliates();
        const updatedAffiliates = affiliates.filter(affiliate => affiliate.rifaId !== rifaId);
        this.setAffiliates(updatedAffiliates);

        return true;
    }

    getAffiliateByRifa(rifaId) {
        const affiliates = this.getAffiliates();
        return affiliates.find(affiliate => affiliate.rifaId === rifaId);
    }

    getUserAffiliates(userId) {
        const affiliates = this.getAffiliates();
        return affiliates.filter(affiliate => affiliate.affiliateId === userId);
    }

    processAffiliateCommission(rifaId, saleAmount) {
        const rifa = this.getRifaById(rifaId);
        if (!rifa || !rifa.affiliateEnabled || !rifa.affiliateId) return;

        const affiliate = this.getAffiliateByRifa(rifaId);
        if (!affiliate) return;

        let commission = 0;
        if (rifa.affiliateType === 'percentage') {
            commission = saleAmount * (rifa.affiliateValue / 100);
        } else {
            commission = rifa.affiliateValue;
        }

        // Atualiza estatísticas do afiliado
        const affiliates = this.getAffiliates();
        const affiliateIndex = affiliates.findIndex(a => a.id === affiliate.id);
        if (affiliateIndex !== -1) {
            affiliates[affiliateIndex].totalSales += saleAmount;
            affiliates[affiliateIndex].totalEarnings += commission;
            this.setAffiliates(affiliates);
        }

        // Adiciona comissão ao saldo do afiliado
        const affiliateUser = this.getUserById(rifa.affiliateId);
        if (affiliateUser) {
            this.updateUserBalance(rifa.affiliateId, affiliateUser.balance + commission);

            // Adiciona transação de comissão
            this.addTransaction({
                userId: rifa.affiliateId,
                type: 'affiliate_commission',
                amount: commission,
                description: `Comissão de afiliado: ${rifa.title}`,
                rifaId: rifaId
            });
        }

        return commission;
    }

    // Método para limpar dados (útil para testes)
    clearAllData() {
        localStorage.removeItem('rifaapp_users');
        localStorage.removeItem('rifaapp_rifas');
        localStorage.removeItem('rifaapp_transactions');
        localStorage.removeItem('rifaapp_participations');
        localStorage.removeItem('rifaapp_affiliates');
        localStorage.removeItem('rifaapp_current_user');
        this.initializeData();
    }

    // Métodos para sessão do usuário
    setCurrentUser(user) {
        localStorage.setItem('rifaapp_current_user', JSON.stringify(user));
    }

    getCurrentUser() {
        const userData = localStorage.getItem('rifaapp_current_user');
        if (userData) {
            const user = JSON.parse(userData);
            // Sempre busca dados atualizados do usuário
            return this.getUserById(user.id);
        }
        return null;
    }

    logout() {
        localStorage.removeItem('rifaapp_current_user');
    }

    // Método para formatar moeda
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    // Método para formatar data
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Instância global do gerenciador de dados
const dataManager = new DataManager(); 