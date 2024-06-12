package com.ncode.ecommerce.dto;

import com.ncode.ecommerce.entity.Address;
import com.ncode.ecommerce.entity.Customer;
import com.ncode.ecommerce.entity.Order;
import com.ncode.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
