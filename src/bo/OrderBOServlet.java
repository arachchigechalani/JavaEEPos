package bo;

import dao.DAOFactory;
import dao.SuperDAO;
import dao.custom.OrderDAO;
import entity.Order;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/order")
public class OrderBOServlet extends HttpServlet {

    OrderDAO orderDAO =(OrderDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ORDER);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String option = req.getParameter("option");
        JsonObjectBuilder response = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        switch (option){

            case "GenarateNewId" :

                try {
                    String genarateId = orderDAO.generateNewOrderId();

                    response.add("status",200);
                    response.add("data",genarateId);

                    writer.print(response.build());


                }catch (SQLException throwables) {

                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", throwables.getLocalizedMessage());
                    writer.print(response.build());

                    resp.setStatus(HttpServletResponse.SC_OK); //200
                    throwables.printStackTrace();
                } catch (ClassNotFoundException e) {
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    writer.print(response.build());

                    resp.setStatus(HttpServletResponse.SC_OK); //200
                    e.printStackTrace();
                }


        }

    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        resp.setContentType("application/json");

        String orderId= jsonObject.getString("orderId");
        String custId= jsonObject.getString("custId");
        String date= jsonObject.getString("date");

        JsonObjectBuilder response = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();

        try {


            if(orderDAO.add(new Order(orderId,custId,date))){


                response.add("status", 200);
                response.add("message", "order Place Completed");


                writer.print(response.build());


            }else {

                response.add("status", 400);
                response.add("message", "order Place Fail");

                writer.print(response.build());


            }


        } catch (SQLException throwables) {

            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", throwables.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            e.printStackTrace();
        }


    }
}
