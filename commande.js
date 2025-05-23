document.getElementById('commandeForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche la soumission classique du formulaire

    // Vérifier le mode de commande sélectionné
    let modeCommande = document.querySelector('input[name="mode"]:checked'); 

    if (modeCommande) {
        if (modeCommande.id === 'emporter') {
            // Si "Emporter" est sélectionné, rediriger vers confirmation.html
            window.location.href = 'confirmation.html';
        } else if (modeCommande.id === 'livraison') {
            // Si "Livraison" est sélectionné, rediriger vers paiement.html
            window.location.href = 'paiement.html';
        }
    } else {
        alert("Veuillez sélectionner un mode de commande.");
    }
});

// Fonction pour afficher l'alerte
function afficherAlerte() {
    alert("Commande passée, merci !");
    window.location.href = 'accueil.html';
}


// Récupération du panier depuis le localStorage
let panier = [];

// Fonction pour charger le panier depuis le localStorage
function chargerPanier() {
    try {
        const panierSauvegarde = localStorage.getItem('panier');
        if (panierSauvegarde) {
            panier = JSON.parse(panierSauvegarde);
        }
    } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        panier = [];
    }
}

// Fonction pour sauvegarder le panier dans le localStorage
function sauvegarderPanier() {
    try {
        localStorage.setItem('panier', JSON.stringify(panier));
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error);
    }
}

// Fonction pour supprimer un article du panier
function supprimerArticle(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        panier.splice(index, 1);
        sauvegarderPanier();
        afficherPanier();
        calculerTotal();
    }
}

// Fonction pour afficher le panier dans la page
function afficherPanier() {
    const pizzasSection = document.querySelector('.pizzas-section');
    const recapTitre = pizzasSection.querySelector('h3');
    
    // Vider le contenu actuel (garder seulement le titre)
    pizzasSection.innerHTML = '';
    pizzasSection.appendChild(recapTitre);
    
    if (panier.length === 0) {
        // Afficher un message si le panier est vide
        const messagePanierVide = document.createElement('div');
        messagePanierVide.className = 'panier-vide';
        messagePanierVide.innerHTML = `
            <p style="text-align: center; font-size: 18px; color: #666; margin: 40px 0;">
                Votre panier est vide.<br>
                <a href="menu.html" style="color: #e60000; text-decoration: underline;">
                    Retourner au menu pour ajouter des articles
                </a>
            </p>
        `;
        pizzasSection.appendChild(messagePanierVide);
        return;
    }
    
    // Afficher chaque article du panier
    panier.forEach((article, index) => {
        const pizzaCard = document.createElement('div');
        pizzaCard.className = 'pizza-card';
        
        // Déterminer l'image en fonction du nom de l'article
        let imageSrc = '';
        const nomLower = article.nom.toLowerCase();
        
        if (nomLower.includes('six fromages')) {
            imageSrc = 'Sixfro.png';
        } else if (nomLower.includes('provençale')) {
            imageSrc = 'provencale.png';
        } else if (nomLower.includes('bissone')) {
            imageSrc = 'Bissone.png';
        } else if (nomLower.includes('forestière')) {
            imageSrc = 'pizza1.png';
        } else if (nomLower.includes('chorizo')) {
            imageSrc = 'Chorizo.png';
        } else if (nomLower.includes('norvégienne')) {
            imageSrc = 'Norvegienne.png';
        } else if (nomLower.includes('savoyarde')) {
            imageSrc = 'Savoyarde.png';
        } else if (nomLower.includes('saumon')) {
            imageSrc = 'Saumon.png';
        } else if (nomLower.includes('campagnarde')) {
            imageSrc = 'Campagnarde.png';
        } else if (nomLower.includes('tiramisu')) {
            imageSrc = 'Tiramisuu.png';
        } else if (nomLower.includes('panettone')) {
            imageSrc = 'panetton.png';
        } else if (nomLower.includes('panacota')) {
            imageSrc = 'pizza2.png';
        } else {
            imageSrc = 'erreur.png'; // Image par défaut
        }
        
        pizzaCard.innerHTML = `
            <img src="${imageSrc}" alt="${article.nom}" class="pizza-img">
            <div class="pizza-info">
                <h4>${article.nom}</h4>
                ${article.taille !== 'Unique' ? `<p>Taille : ${article.taille}</p>` : ''}
                <p class="pizza-prix">Prix : <span class="price">${article.prix.toFixed(2)}€</span></p>
                <button class="moins" onclick="supprimerArticle(${index})">-</button>
            </div>
        `;
        
        pizzasSection.appendChild(pizzaCard);
    });
    
    // Ajouter la section du prix total à la fin
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total-price';
    totalDiv.innerHTML = `<p>Prix Total : <span id="prix-total">${calculerTotal().toFixed(2)}€</span></p>`;
    pizzasSection.appendChild(totalDiv);
}

// Fonction pour calculer le total du panier
function calculerTotal() {
    return panier.reduce((total, article) => total + (article.prix * article.quantite), 0);
}

// Fonction pour gérer la soumission du formulaire
function gererCommande(event) {
    event.preventDefault();
    
    // Vérifier si le panier est vide
    if (panier.length === 0) {
        alert('Votre panier est vide. Veuillez ajouter des articles avant de commander.');
        return;
    }
    
    // Vérifier si un mode de commande est sélectionné
    const modeEmporter = document.getElementById('emporter');
    const modeLivraison = document.getElementById('livraison');
    
    if (!modeEmporter.checked && !modeLivraison.checked) {
        alert('Veuillez sélectionner un mode de commande (À emporter ou Livraison).');
        return;
    }
    
    const modeCommande = modeEmporter.checked ? 'À emporter' : 'Livraison';
    const total = calculerTotal();
    
    // Créer le récapitulatif de la commande
    let recapCommande = `=== RÉCAPITULATIF DE VOTRE COMMANDE ===\n\n`;
    recapCommande += `Mode de commande : ${modeCommande}\n\n`;
    recapCommande += `Articles commandés :\n`;
    
    panier.forEach((article, index) => {
        recapCommande += `${index + 1}. ${article.nom}`;
        if (article.taille !== 'Unique') {
            recapCommande += ` (${article.taille})`;
        }
        recapCommande += ` - ${article.prix.toFixed(2)}€\n`;
    });
    
    recapCommande += `\nPrix total : ${total.toFixed(2)}€\n\n`;
    recapCommande += `Merci pour votre commande !`;
    
    // Afficher le récapitulatif
    alert(recapCommande);
    
    // Vider le panier après la commande
    if (confirm('Votre commande a été enregistrée ! Souhaitez-vous vider votre panier ?')) {
        panier = [];
        sauvegarderPanier();
        // Rediriger vers la page d'accueil
        window.location.href = 'accueil.html';
    }
}

// Initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    // Charger le panier depuis le localStorage
    chargerPanier();
    
    // Afficher le panier
    afficherPanier();
    
    // Ajouter l'événement au formulaire
    const formulaire = document.getElementById('commandeForm');
    if (formulaire) {
        formulaire.addEventListener('submit', gererCommande);
    }
    
    // Mettre à jour le total au chargement
    const prixTotalElement = document.getElementById('prix-total');
    if (prixTotalElement) {
        prixTotalElement.textContent = calculerTotal().toFixed(2) + '€';
    }
});
