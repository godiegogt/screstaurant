package com.screstaurantapp;

import static android.os.SystemClock.sleep;

import android.content.Intent;

import androidx.annotation.NonNull;


import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NavigationModule  extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private Intent intent;
    public static String bactransResultado="";
    public static boolean isPaymentActivityOff=false;



    NavigationModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "NavigationModule";
    } //The name of the component when it is called in the RN code

    @ReactMethod
    public void navigateToNative(Double amount,
                                 String postType, Integer operationType,
                                 String receiptId, Callback sucessCallback, Callback errorCallback){
        ReactApplicationContext context = getReactApplicationContext();
        bactransResultado="";
        intent = new Intent(context,PaymentBACActivity.class);



        if (intent.resolveActivity(context.getPackageManager()) != null) {
            intent.setFlags((Intent.FLAG_ACTIVITY_NEW_TASK));
            intent.putExtra("POSType",postType);
            intent.putExtra("operationType",operationType);
            intent.putExtra("receiptId",receiptId);

            intent.putExtra("amount",amount);
            context.startActivity(intent);
            int tries=0;
            while((bactransResultado==""&&tries<60) || isPaymentActivityOff==false){

                sleep(1000);
                tries++;

            }
            System.out.println("Json de Transaccion "+bactransResultado);
            sucessCallback.invoke(bactransResultado);
            
        }



    }
}