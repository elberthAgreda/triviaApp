package co.com.wwb.game.model;

import java.util.ArrayList;
import java.util.List;


public class Resultado {
	
	private String tipo;
	
	private List<Elemento> listado = new ArrayList<Elemento>();

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
