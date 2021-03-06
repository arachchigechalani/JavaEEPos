package bo;

import dao.DAOFactory;
import dao.custom.ItemDAO;
import entity.Item;

import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/item")
public class ItemBOServlet extends HttpServlet {


    ItemDAO itemDAO = (ItemDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ITEM);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        String code = jsonObject.getString("code");
        String name = jsonObject.getString("name");
        String price = jsonObject.getString("price");
        String qty = jsonObject.getString("qty");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        JsonObjectBuilder response = Json.createObjectBuilder();

        try {
            if (itemDAO.ifItemExist(code)){

                //JsonObjectBuilder response = Json.createObjectBuilder();
                response.add("status", 400);
                response.add("message", "Item Add Fail");
                response.add("data", "");
                writer.print(response.build());
            }else {
                if(itemDAO.add(new Item(code, name, price, qty))){

                    //JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Successfully Added Item");
                    response.add("data", "");
                    writer.print(response.build());

                }
            }

        } catch (SQLException throwables) {
            //JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Item Add Fail");
            response.add("data", throwables.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            //JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Item Add Fail");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            e.printStackTrace();
        }

    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setStatus(HttpServletResponse.SC_CREATED);//201
        String option=req.getParameter("option");
        resp.setContentType("application/json");
        JsonObjectBuilder response = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();
        switch (option){


            case "GETONE" :

                try {

                    if(itemDAO.ifItemExist(req.getParameter("id"))){


                        Item item = itemDAO.search(req.getParameter("id"));

                        System.out.println(item.getCode() + " " + item.getName() + " " + item.getPrice() + " " + item.getQty());

                        JsonObjectBuilder jsonOb = Json.createObjectBuilder();
                        jsonOb.add("code",item.getCode());
                        jsonOb.add("name",item.getName());
                        jsonOb.add("price",item.getPrice());
                        jsonOb.add("qty",item.getQty());

                        //JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status",200);
                        response.add("data",jsonOb.build());

                        //PrintWriter writer = resp.getWriter();
                        writer.print(response.build());


                    }else {

                        //JsonObjectBuilder response = Json.createObjectBuilder();
                        response.add("status",400);
                        response.add("message" , "Customer Not Found");
                        //PrintWriter writer = resp.getWriter();
                        writer.print(response.build());


                    }




                } catch (SQLException throwables) {
                    //JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", throwables.getLocalizedMessage());
                    //PrintWriter writer = resp.getWriter();
                    writer.print(response.build());

                    resp.setStatus(HttpServletResponse.SC_OK); //200
                    throwables.printStackTrace();
                } catch (ClassNotFoundException e) {
                    //JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 400);
                    response.add("message", "Error");
                    response.add("data", e.getLocalizedMessage());
                    //PrintWriter writer = resp.getWriter();
                    writer.print(response.build());

                    resp.setStatus(HttpServletResponse.SC_OK); //200
                    e.printStackTrace();
                }
                break;


            case "GETALL" :

                try {
                    resp.setStatus(HttpServletResponse.SC_OK); //200
                    ArrayList<Item> allItem = itemDAO.getAll();

                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();


                    for (Item item : allItem) {
                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("code", item.getCode());
                        objectBuilder.add("name" , item.getName());
                        objectBuilder.add("price",item.getPrice());
                        objectBuilder.add("qty", item.getQty());

                        arrayBuilder.add(objectBuilder.build());

                    }
                    //JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status" , 200);
                    response.add("message" , "Done");
                    response.add("data" , arrayBuilder.build());

                    //PrintWriter writer = resp.getWriter();
                    writer.print(response.build());




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
                break;


        }
    }


    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String code = req.getParameter("id");
        JsonObjectBuilder response = Json.createObjectBuilder();
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {

            if(itemDAO.ifItemExist(code)){
                itemDAO.delete(code);

                //JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                response.add("status", 200);
                response.add("data", "");
                response.add("message", "Successfully Deleted Item");
                writer.print(response.build());

            }else {
                //JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                response.add("status", 400);
                response.add("data", "");
                response.add("message", "Item Delete Fail");
                writer.print(response.build());
            }


        } catch (SQLException throwables) {
            //JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", throwables.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            throwables.printStackTrace();

            throw new RuntimeException(throwables);
        } catch (ClassNotFoundException e) {

            //JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            e.printStackTrace();
        }

    }
}
