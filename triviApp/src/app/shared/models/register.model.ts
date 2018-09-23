import { User } from "./user.model";

export class Register{
    private username:string;
    private password:string;
    private teamName:string;
    private users:User[];

    /**
     * Getter $username
     * @return {string}
     */
	public get $username(): string {
		return this.username;
	}

    /**
     * Getter $password
     * @return {string}
     */
	public get $password(): string {
		return this.password;
	}

    /**
     * Getter $teamName
     * @return {string}
     */
	public get $teamName(): string {
		return this.teamName;
	}

    /**
     * Getter $users
     * @return {User[]}
     */
	public get $users(): User[] {
		return this.users;
	}

    /**
     * Setter $username
     * @param {string} value
     */
	public set $username(value: string) {
		this.username = value;
	}

    /**
     * Setter $password
     * @param {string} value
     */
	public set $password(value: string) {
		this.password = value;
	}

    /**
     * Setter $teamName
     * @param {string} value
     */
	public set $teamName(value: string) {
		this.teamName = value;
	}

    /**
     * Setter $users
     * @param {User[]} value
     */
	public set $users(value: User[]) {
		this.users = value;
	}

}