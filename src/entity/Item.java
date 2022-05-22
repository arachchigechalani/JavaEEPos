package entity;

public class Item {
    private String code;
    private String name;
    private String price;
    private String qty;

    public Item() {
    }

    public Item(String code, String name, String price, String qty) {
        this.code = code;
        this.name = name;
        this.price = price;
        this.qty = qty;
    }


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getQty() {
        return qty;
    }

    public void setQty(String qty) {
        this.qty = qty;
    }
}