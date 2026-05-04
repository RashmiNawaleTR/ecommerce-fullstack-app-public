import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashPassword {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        String password = "Test123456789!";
        String hash = encoder.encode(password);
        System.out.println("Password hash: " + hash);
    }
}
