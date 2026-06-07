// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .stat, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !sessionStorage.getItem('typingAnimationComplete')) {
        // Animate only the plain text node "Hi, I'm " before the <span>
        const textNode = heroTitle.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            const fullText = textNode.textContent;
            textNode.textContent = '';
            let i = 0;
            function type() {
                if (i < fullText.length) {
                    textNode.textContent += fullText[i++];
                    setTimeout(type, 50);
                }
            }
            type();
        }
        sessionStorage.setItem('typingAnimationComplete', 'true');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation on hover
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
    }
`;
document.head.appendChild(loadingStyle); 

// -------------------------
// Experience Q&A Agent Logic
// -------------------------

const experienceKnowledgeBase = [
    {
        id: 'ge-healthcare',
        role: 'Sr Director of AI',
        company: 'GE HealthCare',
        timeframe: 'Sep 2024 - Present',
        location: 'San Ramon, California',
        summary: 'I lead the research and deployment of multimodal foundation models for 2D/3D medical imaging workflows.',
        highlights: [
            'built a portfolio of 3D medical foundation models trained on cross-modality imaging data and clinical notes',
            'stood up a fine-tuning pipeline that detects disease signatures and speeds up radiologist review',
            'partnered with regulatory, clinical, and product teams to launch imaging AI applications inside GE HealthCare devices'
        ],
        focusAreas: [
            'foundation models',
            'medical imaging',
            'clinical',
            'healthcare',
            'computer vision',
            '3d',
            'regulatory',
            'deployment'
        ],
        topics: ['healthcare', 'foundation_models', 'vision', 'leadership', 'enterprise']
    },
    {
        id: 'amazon',
        role: 'Applied Science Leader',
        company: 'Amazon',
        timeframe: 'Nov 2021 - Sep 2024',
        location: 'Palo Alto, California',
        summary: 'I directed LLM programs covering prompt engineering, few-shot learning, and fine-tuning for enterprise teams.',
        highlights: [
            'scaled a reusable prompt engineering playbook that cut experimentation time for internal teams by 40%',
            'fine-tuned large language models on proprietary datasets for customer support, catalog enrichment, and risk analysis',
            'partnered with product and executive stakeholders to ship generative AI features into production marketplaces'
        ],
        focusAreas: [
            'llm',
            'prompt engineering',
            'few-shot learning',
            'enterprise ai',
            'generative ai',
            'product delivery',
            'stakeholder management'
        ],
        topics: ['llm', 'enterprise', 'leadership', 'innovation']
    },
    {
        id: 'wework',
        role: 'Director of Data Science',
        company: 'WeWork',
        timeframe: 'Aug 2019 - Oct 2021',
        location: 'Palo Alto, California',
        summary: 'I built and led the data science organization responsible for pricing, demand forecasting, and experience personalization.',
        highlights: [
            'stood up a cross-functional analytics platform that unified occupancy, finance, and real-estate signals',
            'launched predictive models that optimized inventory utilization across global markets',
            'mentored managers and senior ICs while maturing experimentation and governance practices'
        ],
        focusAreas: [
            'data platforms',
            'forecasting',
            'pricing',
            'team building',
            'experimentation',
            'people leadership'
        ],
        topics: ['leadership', 'data_platform', 'enterprise']
    },
    {
        id: 'ultimate-software',
        role: 'Director of Data Science',
        company: 'Ultimate Software',
        timeframe: 'Sep 2017 - Aug 2019',
        location: 'San Francisco Bay Area',
        summary: 'I drove predictive analytics and ML-powered HR solutions for large enterprise customers.',
        highlights: [
            'shipped attrition risk models that improved customer success interventions',
            'embedded NLP and recommendation systems into HR workflows for talent insights',
            'led roadmap planning with engineering, design, and go-to-market stakeholders'
        ],
        focusAreas: [
            'predictive analytics',
            'nlp',
            'recommendation systems',
            'hr tech',
            'customer outcomes'
        ],
        topics: ['enterprise', 'data_platform', 'leadership']
    },
    {
        id: 'ancestry',
        role: 'Senior Manager - Data Science',
        company: 'Ancestry',
        timeframe: 'Jun 2015 - Sep 2017',
        location: 'San Francisco, California',
        summary: 'I led teams applying machine learning and computer vision to family history search and discovery.',
        highlights: [
            'built search relevance models that connected customers with the right historical records faster',
            'applied computer vision to digitize and classify billions of archival images',
            'scaled experimentation frameworks to evaluate personalization features'
        ],
        focusAreas: [
            'search',
            'personalization',
            'computer vision',
            'experimentation',
            'consumer ai'
        ],
        topics: ['search', 'vision', 'innovation']
    },
    {
        id: 'ge-global-research',
        role: 'Lead Scientist',
        company: 'GE Global Research',
        timeframe: 'Jul 2012 - Jun 2015',
        location: 'San Ramon, California',
        summary: 'I conducted applied research in machine learning, computer vision, and algorithm design, filing patents along the way.',
        highlights: [
            'designed novel vision algorithms that powered early industrial inspection systems',
            'published peer-reviewed papers and filed multiple patents in ML and imaging',
            'collaborated with global GE business units to transition research into pilots'
        ],
        focusAreas: [
            'research',
            'patents',
            'computer vision',
            'algorithm design',
            'industrial ai'
        ],
        topics: ['innovation', 'vision', 'foundation_models']
    }
];

const topicKeywords = {
    leadership: ['lead', 'leadership', 'manage', 'managed', 'team', 'teams', 'mentor', 'mentoring', 'build', 'built', 'scale', 'scaling'],
    healthcare: ['healthcare', 'medical', 'clinical', 'hospital', 'patient', 'imaging', 'radiology'],
    foundation_models: ['foundation', 'pretrain', 'pre-trained', 'representation', 'multi-modal', 'multimodal'],
    llm: ['llm', 'language', 'prompt', 'chatbot', 'few-shot', 'fine-tune', 'fine tune', 'generative'],
    data_platform: ['data', 'pipeline', 'analytics', 'platform', 'warehouse', 'governance', 'dashboard'],
    search: ['search', 'relevance', 'ranking', 'personalization', 'discovery'],
    vision: ['vision', 'computer', 'imaging', 'detection', 'classification', '3d'],
    enterprise: ['enterprise', 'business', 'product', 'launch', 'roadmap', 'stakeholder', 'executive'],
    innovation: ['research', 'patent', 'publication', 'r&d', 'innovation', 'lab']
};

const fallbackResponses = [
    {
        trigger: 'lead',
        response: 'I have led multi-disciplinary AI teams at GE HealthCare, Amazon, WeWork, and Ultimate Software—covering research, product incubation, and scaled delivery. I focus on setting clear roadmaps, pairing scientists with product goals, and mentoring emerging leaders.'
    },
    {
        trigger: 'team',
        response: 'Team building is core for me: at WeWork I grew the data science org across Palo Alto and NYC, while at Amazon I guided applied scientists through an LLM center of excellence. I emphasize hiring for curiosity, paired programming rituals, and rigorous experiment reviews.'
    },
    {
        trigger: 'product',
        response: 'Most of my AI programs land in production—foundation models for GE imaging devices, generative AI assistants inside Amazon, and predictive HR analytics at Ultimate Software. I partner tightly with product, design, and go-to-market leaders to measure impact.'
    },
    {
        trigger: 'research',
        response: 'From GE Global Research to present day, I stay close to the science. I have authored papers, filed patents, and still design experiments for foundation and language models so that the research roadmap ladders into business outcomes.'
    }
];

const tokenizeText = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);
};

const escapeHtml = (text) => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

class ExperienceAgent {
    constructor(options) {
        this.messagesContainer = options.messagesContainer;
        this.form = options.form;
        this.input = options.input;
        this.topicKeywords = options.topicKeywords;
        this.fallbackResponses = options.fallbackResponses;
        this.typingDelay = options.typingDelay || 650;
        this.typingMessage = null;
        this.knowledgeBase = this.prepareKnowledgeBase(options.knowledgeBase);
        this.registerEvents();
    }

    prepareKnowledgeBase(data) {
        return data.map(item => {
            const searchableText = [
                item.role,
                item.company,
                item.summary,
                item.highlights.join(' '),
                item.focusAreas.join(' ')
            ].join(' ').toLowerCase();

            return {
                ...item,
                searchableText,
                tokenSet: new Set(tokenizeText(searchableText))
            };
        });
    }

    registerEvents() {
        if (!this.form) return;
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!this.input) return;
            const question = this.input.value.trim();
            if (!question) {
                showNotification('Ask something specific like "What did you lead at Amazon?"', 'info');
                return;
            }
            this.handleQuestion(question);
        });
    }

    handleQuestion(question, options = {}) {
        const trimmed = question.trim();
        if (!trimmed) return;
        if (this.input && !options.silentInput) {
            this.input.value = '';
        }
        this.appendMessage('user', trimmed);
        this.setTyping(true);
        setTimeout(() => {
            const response = this.buildResponse(trimmed);
            this.setTyping(false);
            this.appendMessage('agent', response.answer);
            if (response.followUps && response.followUps.length) {
                const uniqueFollowUps = [...new Set(response.followUps)].slice(0, 2);
                if (uniqueFollowUps.length) {
                    this.appendMessage('agent', `I can also dive into ${uniqueFollowUps.join(' or ')} if that helps.`);
                }
            }
        }, this.typingDelay);
    }

    buildResponse(question) {
        const lowerQuestion = question.toLowerCase();
        const questionTokens = tokenizeText(lowerQuestion);
        const questionTokenSet = new Set(questionTokens);

        const ranked = this.knowledgeBase
            .map(exp => ({
                exp,
                score: this.scoreExperience(exp, lowerQuestion, questionTokens, questionTokenSet)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        if (!ranked.length) {
            return {
                answer: this.composeFallbackResponse(lowerQuestion),
                followUps: this.knowledgeBase.slice(0, 3).map(exp => `${exp.company} ${exp.role}`)
            };
        }

        const topMatches = ranked.slice(0, 2);
        const answer = topMatches
            .map(item => this.formatExperienceAnswer(item.exp, questionTokenSet))
            .join('\n\n');

        const followUps = this.knowledgeBase
            .filter(exp => !topMatches.some(match => match.exp.id === exp.id))
            .slice(0, 3)
            .map(exp => `${exp.company} ${exp.role}`);

        return { answer, followUps };
    }

    scoreExperience(exp, questionLower, questionTokens, questionTokenSet) {
        let score = 0;
        const companyWords = exp.company.toLowerCase().split(' ');
        const roleWords = exp.role.toLowerCase().split(' ');

        if (questionLower.includes(exp.company.toLowerCase())) {
            score += 6;
        }

        companyWords.forEach(word => {
            if (word.length > 3 && questionTokenSet.has(word)) {
                score += 3;
            }
        });

        if (questionLower.includes(exp.role.toLowerCase())) {
            score += 3;
        }

        roleWords.forEach(word => {
            if (word.length > 4 && questionTokenSet.has(word)) {
                score += 1.5;
            }
        });

        exp.focusAreas.forEach(area => {
            const normalized = area.toLowerCase();
            if (normalized.length <= 3) return;
            if (normalized.includes(' ')) {
                if (questionLower.includes(normalized)) {
                    score += 3;
                }
            } else if (questionTokenSet.has(normalized)) {
                score += 2.5;
            }
        });

        exp.topics.forEach(topic => {
            const keywords = this.topicKeywords[topic] || [];
            if (keywords.some(keyword => questionLower.includes(keyword))) {
                score += 2.5;
            }
        });

        questionTokens.forEach(token => {
            if (token.length > 3 && exp.tokenSet.has(token)) {
                score += 0.6;
            }
        });

        return score;
    }

    formatExperienceAnswer(exp, questionTokenSet) {
        const highlight = this.pickHighlight(exp, questionTokenSet);
        const base = `${exp.role} at ${exp.company} (${exp.timeframe}) – ${exp.summary}`;
        return highlight ? `${base} Key impact: ${highlight}.` : base;
    }

    pickHighlight(exp, questionTokenSet) {
        if (!exp.highlights.length) return '';
        const matchingHighlight = exp.highlights.find(highlight => {
            const normalized = tokenizeText(highlight);
            return normalized.some(word => word.length > 3 && questionTokenSet.has(word));
        });
        return matchingHighlight || exp.highlights[0];
    }

    composeFallbackResponse(questionLower) {
        const tailored = this.fallbackResponses.find(item => questionLower.includes(item.trigger));
        if (tailored) {
            return tailored.response;
        }
        return 'My background spans GE HealthCare, Amazon, WeWork, Ultimate Software, Ancestry, and GE Global Research. Mention a company, technology, or problem space—like LLMs, foundation models, or scaling teams—and I\'ll share the most relevant story.';
    }

    appendMessage(sender, text) {
        if (!this.messagesContainer) return;
        const message = document.createElement('div');
        message.className = `agent-message ${sender === 'user' ? 'agent-message-user' : 'agent-message-agent'}`;

        const avatar = document.createElement('div');
        avatar.className = 'agent-avatar';
        avatar.textContent = sender === 'user' ? 'You' : 'AI';

        const bubble = document.createElement('div');
        bubble.className = 'agent-bubble';
        bubble.innerHTML = this.formatBubbleText(text);

        message.appendChild(avatar);
        message.appendChild(bubble);
        this.messagesContainer.appendChild(message);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    formatBubbleText(text) {
        const safeText = escapeHtml(text);
        const parts = safeText.split('\n').map(part => part.trim()).filter(Boolean);
        if (!parts.length) {
            return `<p>${safeText}</p>`;
        }
        return parts.map(part => `<p>${part}</p>`).join('');
    }

    setTyping(state) {
        if (!this.messagesContainer) return;
        if (state) {
            this.typingMessage = document.createElement('div');
            this.typingMessage.className = 'agent-message agent-message-agent agent-typing';
            this.typingMessage.innerHTML = `
                <div class="agent-avatar">AI</div>
                <div class="agent-bubble">Thinking...</div>
            `;
            this.messagesContainer.appendChild(this.typingMessage);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        } else if (this.typingMessage) {
            this.typingMessage.remove();
            this.typingMessage = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('agentMessages');
    const agentForm = document.getElementById('agentForm');
    const agentInput = document.getElementById('agentInput');
    const suggestionChips = document.querySelectorAll('.experience-agent .chip');

    if (messagesContainer && agentForm && agentInput) {
        const agentInstance = new ExperienceAgent({
            messagesContainer,
            form: agentForm,
            input: agentInput,
            knowledgeBase: experienceKnowledgeBase,
            topicKeywords,
            fallbackResponses
        });

        suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const question = chip.dataset.question || chip.textContent;
                if (!question) return;
                agentInput.focus();
                agentInstance.handleQuestion(question, { silentInput: true });
            });
        });
    }
});