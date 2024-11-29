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