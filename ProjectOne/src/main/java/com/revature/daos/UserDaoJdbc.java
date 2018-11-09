package com.revature.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.models.UserRole;
import com.revature.models.Users;
import com.revature.util.ConnectionUtil;
import com.revature.util.HashingUtil;

public class UserDaoJdbc implements UserDao{

	
	private Logger log = Logger.getRootLogger();

	@Override
	public List<Users> findAll() {
		try (Connection conn = ConnectionUtil.getConnection()) {
			PreparedStatement ps = conn.prepareStatement(
				"SELECT * FROM ers_users LIMIT 10" 
				 
			);
			
			ResultSet rs =  ps.executeQuery();
			
			List<Users> users = new ArrayList<>(); 
				while(rs.next()){
					users.add(new Users((rs.getInt("ers_users_id")),(rs.getString("ers_username")),(rs.getString("ers_password")), (rs.getString("user_first_name")), rs.getString("user_last_name"), rs.getString("user_email"), rs.getInt("user_role_id"),null));
					}
				return users;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

		//ok...so this method will always return the next available id
		//pass into user id when saving new user (^_^)
	public int nextId() {
		try (Connection conn = ConnectionUtil.getConnection()) {
			PreparedStatement ps = conn.prepareStatement(
				"SELECT (MAX(ers_users_id)+1) AS nextid FROM ers_users" 	 
			);
			
			ResultSet rs =  ps.executeQuery();
			rs.next();//need to iterate to get first (only row)
			return rs.getInt(1); //get the value in column one (well...there's only one column...)
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
	}
	
	
	//when user fills out registration form a POST will send the data here
	@Override
	public int save(Users u) {
		try (Connection conn = ConnectionUtil.getConnection()) {
			PreparedStatement ps = conn.prepareStatement(
				"INSERT INTO ers_users (ers_users_id, ers_username,ers_password, user_first_name, user_last_name, user_email, user_role_id) VALUES (?, ? ,?, ?, ?, ?, ?)"
				
			);
			ps.setInt(1, nextId());//calling nextId() because user doesn't enter this
			ps.setString(2, u.getUsername());//user entry
			ps.setString(3, HashingUtil.hashword(u.getPassword()));//no more plaintext passwords, yay!
			ps.setString(4, u.getFirstName());//user entry
			ps.setString(5, u.getLastName());//user entry
			ps.setString(6, u.getEmail());//user entry
			ps.setInt(7, 2);//user role will always be 2 because 1 is for managers
			ps.executeUpdate();
			
			return nextId();//if all goes well the next id will return for new user creation
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public Users findByUsernameAndPassword(String username, String password) {
		try (Connection conn = ConnectionUtil.getConnection()) {
			PreparedStatement ps = conn.prepareStatement(
					"SELECT * FROM ers_users INNER JOIN user_roles"
					+ "ON (ers_users.user_role_id = user_roles.ers_user_role_id) "
					+ "WHERE username = ?  AND pass = ?");
			ps.setString(1, username);
			ps.setString(2, password);//needs to match hash
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				//return extractFromResultSet(rs);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Users findById(int id) {
		try (Connection conn = ConnectionUtil.getConnection()) {
			PreparedStatement ps = conn.prepareStatement(
					"SELECT ers_users_id, ers_username, ers_user_role_id, user_role FROM ers_users\n" + 
					"INNER JOIN user_roles ON ers_users.user_role_id=user_roles.ers_user_role_id "
					+ "WHERE ers_users_id=?");
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				return new Users(rs.getInt("ers_users_id"), rs.getString("ers_username"), 
						new UserRole(rs.getInt("ers_user_role_id"),rs.getString("user_role")));
			}
			} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
