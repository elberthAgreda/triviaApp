package co.com.wwb.game.model;

import java.util.ArrayList;
import java.util.List;


public class Resultado {
	private String userName;
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	private String tipo;
	
	private List<Elemento> listado = new ArrayList<Elemento>();

	private boolean exito;
	

	public boolean isExito() {
		return exito;
	}

	public void setExito(boolean exito) {
		this.exito = exito;
	}

	/**
	 * @return the tipo
	 */
	public String getTipo() {
		return tipo;
	}

	/**
	 * @param tipo the tipo to set
	 */
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	/**
	 * @return the listado
	 */
	public List<Elemento> getListado() {
		return listado;
	}

	/**
	 * @param listado the listado to set
	 */
	public void setListado(List<Elemento> listado) {
		this.listado = listado;
	}
}
