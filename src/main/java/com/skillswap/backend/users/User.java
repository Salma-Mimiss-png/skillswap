package com.skillswap.backend.users;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User implements Serializable {

	@Id
	private String id;
	
	private String nom;
	
    private String prenom;
    
    private String telephone;
    
    private String email;

    private String password;

    private String type;
    

	public User() {
		super();
	}
	
	public User(String  id, String nom, String prenom, String telephone, String email, String password, String type) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.telephone = telephone;
		this.email = email;
		this.password = password;
		this.type = type;
	}

	public User(String nom, String prenom, String telephone, String email, String password, String type) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.telephone = telephone;
		this.email = email;
		this.password = password;
		this.type = type;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String  id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
