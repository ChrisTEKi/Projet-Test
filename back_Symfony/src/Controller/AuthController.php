<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Client;
use Symfony\Component\HttpFoundation\JsonResponse;

class AuthController extends AbstractController{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $em): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Vérification email déjà utilisé
        $existing = $em->getRepository(Client::class)->findOneBy(['email' => $data['email']]);
        if ($existing) {
            return new JsonResponse(['error' => 'Email déjà utilisé'], 400);
        }

        // Création du client
        $client = new Client();
        $client->setNom($data['nom']);
        $client->setPrenom($data['prenom']);
        $client->setEmail($data['email']);
        $client->setRole('client');

        /*
          Rôle dynamique :
          - Si le frontend envoie "admin" → admin
          - Si le frontend envoie "fournisseur" → fournisseur
          - Sinon → client
         */
        $role = $data['role'] ?? 'client';
        $client->setRole($role);


        // Hash du mot de passe
        $hashedPassword = password_hash($data['mot_de_passe'], PASSWORD_BCRYPT);
        $client->setMotDePasse($hashedPassword);

        // Sauvegarde en base
        $em->persist($client);
        $em->flush();

        return new JsonResponse(['message' => 'Inscription réussie'], 201);
    }

    /*
      CONNEXION
      - Vérifie si l’email existe
      - Vérifie le mot de passe hashé
      - Retourne les infos du compte (dont le rôle)
     */
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $em): JsonResponse{
        $data = json_decode($request->getContent(), true);

        // Recherche du client par email
        $client = $em->getRepository(Client::class)->findOneBy(['email' => $data['email']]);

        if (!$client) {
            return new JsonResponse(['error' => 'Email incorrect'], 401);
        }

        // Vérification du mot de passe
        if (!password_verify($data['mot_de_passe'], $client->getMotDePasse())) {
            return new JsonResponse(['error' => 'Mot de passe incorrect'], 401);
        }

        return new JsonResponse([
            'message' => 'Connexion réussie',
            'client' => [
                'id' => $client->getId(),
                'nom' => $client->getNom(),
                'prenom' => $client->getPrenom(),
                'email' => $client->getEmail(),
                'role' => $client->getRole()
            ]
        ]);
    }
    
}
