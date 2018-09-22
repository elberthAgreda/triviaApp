package co.com.wwb.game.model;

public class WWBGameUsuario {
	
	private String name;
	private String documentId;
	
	public WWBGameUsuario() {
	}
	
	public WWBGameUsuario(String name, String documentId) {
		this.name = name;
		this.documentId = documentId;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDocumentId() {
		return documentId;
	}
	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}
}
