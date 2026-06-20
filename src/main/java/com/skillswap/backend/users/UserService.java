package com.skillswap.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	public User recupererUserParId(String id) {		
		return userRepository.findById(id).orElse(null);
    }
	
	public User authentifierAppUser(AppUserDto user) {		
		return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
    }
	
	public User registerAppUser(User user) {
		user.setType(UsersTypeEnum.APP_USER.name());
		
        return userRepository.save(user);
    }
	
	public User modifierAppUser(User userModifie, String id) {
		User user = userRepository.findById(id).orElse(null);
		
		if(user != null) {
			user.setNom(userModifie.getNom());
			user.setPrenom(userModifie.getPrenom());
			user.setEmail(userModifie.getEmail());
			user.setTelephone(userModifie.getTelephone());
			
			return userRepository.save(user);
		}
		
        return user;
    }
}
