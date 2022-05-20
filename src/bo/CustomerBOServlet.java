package bo;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "customer")
public class CustomerBOServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        String id=jsonObject.getString("id");
        String name=jsonObject.getString("name");
        String address=jsonObject.getString("address");
        String tp=jsonObject.getString("tp");

        System.out.println(id+" "+name+" "+address+" "+tp);*/
    }
}
