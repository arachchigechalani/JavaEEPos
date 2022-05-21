package dao;

import dao.custom.impl.CustomerDAOImpl;

public class DAOFactory {
    private static DAOFactory daoFactory;

    private DAOFactory(){

    }
    public static DAOFactory getDaoFactory(){
        if (daoFactory==null){
            daoFactory=new DAOFactory();
        }
        return daoFactory;
    }

    public enum DAOTypes{
        CUSTOMER
    }

    public SuperDAO getDAO (DAOTypes types){
        switch (types){

            case CUSTOMER: return new CustomerDAOImpl();
            default: return null;
        }
    }
}
