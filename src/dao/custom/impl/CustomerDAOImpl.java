package dao.custom.impl;

import dao.CrudUtil;
import dao.custom.CustomerDAO;
import entity.Customer;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerDAOImpl implements CustomerDAO {

    @Override
    public boolean add(Customer customer) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate("INSERT INTO Customer (custId,custName,custAddress,tp) VALUES (?,?,?,?)",customer.getId(),customer.getName(),customer.getAddress(),customer.getTp());
    }

    @Override
    public boolean delete(String s) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public boolean update(Customer customer) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public Customer search(String s) throws SQLException, ClassNotFoundException {
        return null;
    }

    @Override
    public ArrayList<Customer> getAll() throws SQLException, ClassNotFoundException {
        ArrayList<Customer> allCustomers=new ArrayList<>();
        ResultSet resultSet = CrudUtil.executeQuery("SELECT * FROM Customer");
        while (resultSet.next()){
            allCustomers.add(new Customer(resultSet.getString("custId"),resultSet.getString("custName"),resultSet.getString("custAddress"),resultSet.getString("tp")));
        }
        return allCustomers;

    }
}
