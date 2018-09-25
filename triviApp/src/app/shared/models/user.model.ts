<<<<<<< Updated upstream
export class User{
    private name:string;
    private documentId:string;
=======
export class User{
    private name:string;
    private documentId:string;

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $documentId
     * @return {string}
     */
	public get $documentId(): string {
		return this.documentId;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $documentId
     * @param {string} value
     */
	public set $documentId(value: string) {
		this.documentId = value;
	}

>>>>>>> Stashed changes
}