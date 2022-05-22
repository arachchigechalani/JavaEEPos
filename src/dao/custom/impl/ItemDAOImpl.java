package dao.custom.impl;

import dao.CrudUtil;
import dao.custom.ItemDAO;
import entity.Item;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemDAOImpl implements ItemDAO {

    @Override
    public boolean ifItemExist(String code) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public boolean add(Item item) throws SQLException, ClassNotFoundException {
        return   CrudUtil.executeUpdate("INSERT INTO Item(code,name,price,qty) VALUES(?,?,?,?)",item.getCode(),item.getName(),item.getPrice(),item.getQty());
    }

    @Override
    public boolean delete(String id) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate("DELETE FROM Item WHERE code=?", id);
    }

    @Override
    public boolean update(Item item) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public Item search(String s) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery("SELECT * FROM Item WHERE code=?", s);
        resultSet.next();
        return new Item(resultSet.getString("code"),resultSet.getString("name"),resultSet.getString("price"),resultSet.getString("qty"));
    }

    @Override
    public ArrayList<Item> getAll() throws SQLException, ClassNotFoundException {
        return null;
    }
}
