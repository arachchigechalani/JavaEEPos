package dao.custom;

import java.sql.SQLException;

public interface OrderDAO {
    boolean ifOrderExist(String oid) throws SQLException, ClassNotFoundException;
    String generateNewOrderId() throws SQLException, ClassNotFoundException;
}
