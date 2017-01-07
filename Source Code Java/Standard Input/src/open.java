import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class open {
	public static void main(String[] args) throws IOException, InterruptedException{
		String msg = getList();
		String info [] = new String [2];
		getInfo(info, msg);
		BufferedWriter write = new BufferedWriter(new FileWriter("log.txt"));
		write.write(msg);
		write.newLine();
		write.write(info[0]);
		write.newLine();
		write.write(info[1]);
		write.newLine();
		write.write(msg);
		write.close();
		run(info);
		
	}
	private static void run(String[] info) throws IOException, InterruptedException {
		Runtime rt = null;
		rt = Runtime.getRuntime();
		if(info[0].equals("firefox")== true){
			//Process p = Runtime.getRuntime().exec("cmd.exe /c start firefox " + info[1]);
			rt.exec("C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe " + info[1]);
		}else if(info[0].equals("opera")== true){
				//Process p = Runtime.getRuntime().exec("cmd.exe /c start opera " + info[1]);
				rt.exec("C:\\Program Files (x86)\\Opera\\launcher.exe " + info[1]);
		}else if(info[0].equals("edge") == true){
			String link[] = info[1].split(" ");
			for(int x=0; x< link.length; x++){
				if(link[x].contains("http://")){
					link[x]=link[x].substring(6,link[x].length()-1);
					Process p = Runtime.getRuntime().exec("cmd.exe /c start microsoft-edge:http://" + link[x]);
				}else if(link[x].contains("https://")){
					link[x]=link[x].substring(7,link[x].length()-1);
					Process p = Runtime.getRuntime().exec("cmd.exe /c start microsoft-edge:https://" + link[x]);
				}else{
					Process p = Runtime.getRuntime().exec("cmd.exe /c start microsoft-edge:http://" + link[x]);
				}
				TimeUnit.SECONDS.sleep(1);
			}
		}
	}
	private static void getInfo(String[] info, String msg) {
		int index = msg.indexOf("/*/*/");
		info[0] = msg.substring(index+5, msg.length());
		info[1] = msg.substring(0, index);
		
	}
	public static int getLength(byte[] bytes) {
        return (bytes[3] << 24) & 0xff000000|
                (bytes[2] << 16)& 0x00ff0000|
                (bytes[1] << 8) & 0x0000ff00|
                (bytes[0] << 0) & 0x000000ff;
    }
	
	public static String getList(){
	    byte[] firstFour = new byte[4];
	
	    try{
	        System.in.read(firstFour);
	        int size = getLength(firstFour);
	
	        byte[] message = new byte[size];
	        System.in.read(message);
	        String finalStr = new String(message, "UTF-8");

			finalStr = finalStr.substring(9, finalStr.length()-2);
			
	        return finalStr;
	
	    }catch (IOException e){
	        return null;
	    }

	}
}
