package com.ncode.ecommerce.service;

import com.ncode.ecommerce.dto.PaymentInfo;
import com.ncode.ecommerce.dto.Purchase;
import com.ncode.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
