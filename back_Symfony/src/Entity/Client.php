<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\ORM\Mapping as ORM;

/*
  Entité Client
  Représente un utilisateur dans la base PostgreSQL.
  Doctrine utilise cette classe pour créer la table et gérer les données.
 */
#[ORM\Entity(repositoryClass: ClientRepository::class)]
class Client
{
    /** Identifiant unique (clé primaire) */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /** Nom du client */
    #[ORM\Column(length: 100)]
    private ?string $nom = null;

    /** Prénom du client */
    #[ORM\Column(length: 100)]
    private ?string $prenom = null;

    /** Email unique (utilisé pour login) */
    #[ORM\Column(length: 150, unique: true)]
    private ?string $email = null;

    /** Mot de passe hashé (jamais stocké en clair) */
    #[ORM\Column(length: 255)]
    private ?string $motDePasse = null;

    /** Rôle du client (client, admin, vendeur, etc.) */
    #[ORM\Column(length: 50)]
    private ?string $role = 'client';

    /** Date de création du compte */
    #[ORM\Column]
    private ?\DateTimeImmutable $dateCreation = null;

    public function __construct()
    {
        // Initialise automatiquement la date de création
        $this->dateCreation = new \DateTimeImmutable();
    }

    // -------------------------
    // GETTERS & SETTERS
    // -------------------------

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getMotDePasse(): ?string
    {
        return $this->motDePasse;
    }

    public function setMotDePasse(string $motDePasse): self
    {
        $this->motDePasse = $motDePasse;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getDateCreation(): ?\DateTimeImmutable
    {
        return $this->dateCreation;
    }
}
