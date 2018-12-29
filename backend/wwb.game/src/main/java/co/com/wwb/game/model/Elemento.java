package co.com.wwb.game.model;

public class Elemento {

	private String codigo;
	
	private String nombre;

	private String ciudad;

	private String agencia;

	public Elemento(){
	}
	
	public Elemento(String codigo, String nombre){
		this.codigo = codigo;
		this.nombre = nombre;
	}

	public Elemento(String codigo, String nombre, String ciudad){
		this.codigo = codigo;
		this.nombre = nombre;
		this.ciudad = ciudad;
	}

	public Elemento(String codigo, String nombre, String ciudad ,String agencia){
		this.codigo = codigo;
		this.nombre = nombre;
		this.ciudad = ciudad;
		this.agencia = agencia;
	}

	/**
	 * @return the codigo
	 */
	public String getCodigo() {
		return codigo;
	}

	/**
	 * @param codigo the codigo to set
	 */
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	/**
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * @return the ciudad
	 */
	public String getCiudad() {
		return ciudad;
	}

	/**
	 * @param ciudad the ciudad to set
	 */
	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	/**
	 * @return the agencia
	 */
	public String getAgencia() {
		return agencia;
	}

	/**
	 * @param agencia the agencia to set
	 */
	public void setAgencia(String agencia) {
		this.agencia = agencia;
	}

	
}
