package com.revature.models;

import java.sql.Timestamp;

public class Reimb {

	private int reimbId;
	private double amount;
	private Timestamp submitted;
	private Timestamp resolved;
	private String description;
	private boolean reciept;
	private int author;
	private int resolver;
	private int status;
	private int type;
	
	public Reimb() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Reimb(int reimbId, double amount, Timestamp submitted, Timestamp resolved, String description, boolean reciept, int author,
			int resolver, int status, int type) {
		super();
		this.reimbId = reimbId;
		this.amount = amount;
		this.submitted = submitted;
		this.resolved = resolved;
		this.description = description;
		this.reciept = reciept;
		this.author = author;
		this.resolver = resolver;
		this.status = status;
		this.type = type;
	}

	
	public int getReimbId() {
		return reimbId;
	}

	public void setReimbId(int reimbId) {
		this.reimbId = reimbId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Timestamp getSubmitted() {
		return submitted;
	}

	public void setSubmitted(Timestamp submitted) {
		this.submitted = submitted;
	}

	public Timestamp getResolved() {
		return resolved;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	

	public void setResolved(Timestamp resolved) {
		this.resolved = resolved;
	}

	public boolean isReciept() {
		return reciept;
	}

	public void setReciept(boolean reciept) {
		this.reciept = reciept;
	}

	public int getAuthor() {
		return author;
	}

	public void setAuthor(int author) {
		this.author = author;
	}

	public int getResolver() {
		return resolver;
	}

	public void setResolver(int resolver) {
		this.resolver = resolver;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Reimb [reimbId=" + reimbId + ", amount=" + amount + ", submitted=" + submitted + ", resolved="
				+ resolved + ", reciept=" + reciept + ", author=" + author + ", resolver=" + resolver + ", status="
				+ status + ", type=" + type + "]";
	}

	
	
}
