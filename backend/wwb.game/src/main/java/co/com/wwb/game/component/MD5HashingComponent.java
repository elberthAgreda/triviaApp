package co.com.wwb.game.component;

import java.security.MessageDigest;

import org.springframework.stereotype.Component;

@Component
public class MD5HashingComponent {
	public static void main(String[] args) {
		MD5HashingComponent component= new MD5HashingComponent();
		System.out.println(component.encript("SuperCinco5"));
	}
	public String encript(String password) {
		
		String encripted="";
    	try {
	        MessageDigest md = MessageDigest.getInstance("MD5");
	        md.update(password.getBytes());
	        byte byteData[] = md.digest();
	 
	        //convert the byte to hex format method 1
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < byteData.length; i++) {
	         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
	        }

	        /*System.out.println("Digest(in hex format):: " + sb.toString());
	        
	        //convert the byte to hex format method 2
	        StringBuffer hexString = new StringBuffer();
	    	for (int i=0;i<byteData.length;i++) {
	    		String hex=Integer.toHexString(0xff & byteData[i]);
	   	     	if(hex.length()==1) hexString.append('0');
	   	     	hexString.append(hex);
	    	}
	    	System.out.println("Digest(in hex format):: " + hexString.toString());*/
	        
	        encripted = sb.toString();
	    	
    	}catch(Exception e) {
    		e.printStackTrace();
    	}
    	
    	return encripted;
	}
	
}
