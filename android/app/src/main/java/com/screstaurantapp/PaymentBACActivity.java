package com.screstaurantapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.kinpos.kpinvocacion.KP_Codes;
import com.kinpos.kpinvocacion.KP_Invocador;
import com.kinpos.kpinvocacion.Trans_Results;
import com.kinpos.printer.A920Printer;
import com.kinpos.printer.ALINEAMIENTO;
import com.kinpos.printer.OperationResult;
import com.kinpos.printer.TAMANIO_LETRA;

public class PaymentBACActivity extends AppCompatActivity {
    private String user = "jsanchez";
    private String password = "K1np0$2usa";
    private String deviceID = "JOSE00013";
    private String eMail = "prueba@kinpos.com";
    private boolean showMessages = true;
    private String mposURL = "com.kinpos.BASEA920";
    public static String pruebaResultado="";
    Double amountValue=0.0;
    String postType="";
    Integer operationType;
    String receiptId;
    Bundle paymentAmount=null;
    PaidResponse paidResponse;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment_bac);
        paidResponse=new PaidResponse();
        paymentAmount= getIntent().getExtras();
        LogicToPos();

    }
    private void LogicToPos()
    {
        try {
            if (paymentAmount != null) {
                postType = paymentAmount.getString("POSType");
                operationType = paymentAmount.getInt("operationType");
                if (postType.equalsIgnoreCase("bac")) {
                    switch (operationType) {
                        case 0:
                            amountValue = paymentAmount.getDouble("amount");
                            new Thread(new Runnable() {
                                @Override
                                public void run() {
                                    makeSale(true);
                                }
                            }).start();
                            break;
                        case 1:
                            receiptId = paymentAmount.getString("receiptId");
                            new Thread(new Runnable() {
                                @Override
                                public void run() {
                                    makeVoid(receiptId);
                                }
                            }).start();

                            break;
                        case 2:

                            new Thread(new Runnable() {
                                @Override
                                public void run() {
                                    makeSettlement();
                                }
                            }).start();

                            break;
                        default:
                            msgBoxSaleSuccess("Error", "Operacion no permitida", "Aceptar");

                            break;
                    }
                } else {
                    msgBoxSaleSuccess("Aviso", "Aún no compatible con POS Visa", "Aceptar");
                }

            }
        }
        catch (Exception ex)
        {
            paidResponse=new PaidResponse();
            paidResponse.setCode(1);
            paidResponse.setStatus("error");
            paidResponse.setData("");
            NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
            msgBoxSaleSuccess("Aviso", "Dispositivo incompatible para pago con tarjeta", "Aceptar");
        }
    }

    public void makeSale(boolean showMessages) {
        try {
            KP_Invocador kpInvocador = new KP_Invocador(mposURL, PaymentBACActivity.this);
            Double pago=amountValue;
            Double impuesto=amountValue/1.12;
            pago=Double.valueOf(pago.doubleValue()*100.0D);
            impuesto=Double.valueOf(impuesto.doubleValue()*100.0D);

            kpInvocador.KP_Sale(user, password, deviceID, pago.longValue(), impuesto.longValue(), 0, eMail, "0416", showMessages);
        } catch (Exception ex) {
            paidResponse=new PaidResponse();
            paidResponse.setCode(1);
            paidResponse.setStatus("error");
            paidResponse.setData("");
            NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
            msgBoxSaleSuccess("Error", "Inconveniente al iniciar a leer tarjeta", "Aceptar");
        }
    }

    public  void    makeVoid        (String recibo)
    {
        try
        {


            if (recibo==null || recibo.isEmpty())
            {
                paidResponse=new PaidResponse();
                paidResponse.setCode(0);
                paidResponse.setStatus("error");
                paidResponse.setData("");
                NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
                msgBoxSaleSuccess("Atención","No hay TokenId para anular","Aceptar");
                return;
            }

            KP_Invocador    kpInvocador = new KP_Invocador(mposURL, PaymentBACActivity.this);

            kpInvocador.KP_Void(user,password,deviceID, recibo,eMail,"0212", recibo);

        }
        catch(Exception ex)
        {
            paidResponse=new PaidResponse();
            paidResponse.setCode(1);
            paidResponse.setStatus("error");
            paidResponse.setData("");
            NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
            msgBoxSaleSuccess("Error",ex.getMessage(),"Aceptar");
        }
    }

    public  void    makeSettlement  (                       )
    {
        try
        {
            KP_Invocador kpInvocador = new KP_Invocador(mposURL, PaymentBACActivity.this);

            kpInvocador.    KP_Close(user,password,deviceID);
        }
        catch(Exception ex)
        {
            paidResponse=new PaidResponse();
            paidResponse.setCode(1);
            paidResponse.setStatus("error");
            paidResponse.setData("");
            NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
            msgBoxSaleSuccess("Error",ex.getMessage(),"Aceptar");
        }
    }

    protected void msgBox(final String titulo, final String mensaje, final String textoBotonOk){
        try
        {
            runOnUiThread(new Runnable()
            {
                @Override
                public void run()
                {
                    AlertDialog.Builder builder = new AlertDialog.Builder(PaymentBACActivity.this);
                    builder.setTitle    (   titulo  );
                    builder.setMessage  (   mensaje );

                    builder.setPositiveButton(textoBotonOk, new DialogInterface.OnClickListener()
                    {
                        public void onClick(DialogInterface dialoginterface, int i)
                        {
                            dialoginterface.dismiss();
                            //makeSale( showMessages );
                        }
                    });

                    Dialog alertDialog = builder.create     (           );
                    alertDialog.setCanceledOnTouchOutside   (   false   );
                    alertDialog.show                        (           );
                }
            });

        }
        catch(Exception ex)
        {
            final String errMsg = ex.getMessage();
            Log.e("PaymentBACActivity", "msgBox \n" + errMsg);

            runOnUiThread(new Runnable()
            {
                @Override
                public void run()
                {
                    Toast.makeText(PaymentBACActivity.this, errMsg, Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    protected void msgBoxSaleSuccess(final String titulo, final String mensaje, final String textoBotonOk){
        try
        {
            runOnUiThread(new Runnable()
            {
                @Override
                public void run()
                {
                    AlertDialog.Builder builder = new AlertDialog.Builder(PaymentBACActivity.this);
                    builder.setTitle    (   titulo  );
                    builder.setMessage  (   mensaje );

                    builder.setPositiveButton(textoBotonOk, new DialogInterface.OnClickListener()
                    {
                        public void onClick(DialogInterface dialoginterface, int i)
                        {
                            NavigationModule.isPaymentActivityOff=true;
                            finish();
                            //makeSale( showMessages );
                        }
                    });

                    Dialog alertDialog = builder.create     (           );
                    alertDialog.setCanceledOnTouchOutside   (   false   );
                    alertDialog.show                        (           );
                }
            });

        }
        catch(Exception ex)
        {
            final String errMsg = ex.getMessage();
            Log.e("PaymentBACActivity", "msgBox \n" + errMsg);

            runOnUiThread(new Runnable()
            {
                @Override
                public void run()
                {
                    Toast.makeText(PaymentBACActivity.this, errMsg, Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    public void imprimirDocumento ()
    {

        A920Printer printer = new A920Printer( PaymentBACActivity.this );


        //--------------------------------------------------------------------
        // Nivel de la tinta
        // Posibles valores;
        //      1. 100
        //      2. 200
        //      3. 300
        //      4. 400
        //      5. 500
        //--------------------------------------------------------------------

        printer.setGray( 300 );

        //--------------------------------------------------------------------
        // Logo
        //--------------------------------------------------------------------
        Bitmap logoCredomatic = BitmapFactory.decodeResource(getResources(), R.drawable.credomaticprinter);


        printer.addLogoHeader(  logoCredomatic );

        //--------------------------------------------------------------------
        // Section 1, Recibo con letras medianas
        //--------------------------------------------------------------------

        printer.addLineaImprimir( "LINEA 01 \n" , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.CENTRO       );
        printer.addLineaImprimir( "LINEA 02 \n" , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "LINEA 03 \n" , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.DERECHA      );
        printer.addLineaImprimir( "         \n" , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "FIRMA    \n" , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.CENTRO       );
        printer.addLineaImprimir( "1234567890abcdefghij123456789???\n"  , TAMANIO_LETRA.MEDIANO, ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.IZQUIERDA    );


        //--------------------------------------------------------------------
        // Section 1, Recibo con letras grandes
        //--------------------------------------------------------------------

        printer.addLineaImprimir( "LINEA 01\n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.CENTRO       );
        printer.addLineaImprimir( "LINEA 02\n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "LINEA 03\n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.DERECHA      );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "FIRMA\n"     , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.CENTRO       );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.GRANDE  , ALINEAMIENTO.IZQUIERDA    );


        //--------------------------------------------------------------------
        // Section 1, Recibo con letras pequeñas
        //--------------------------------------------------------------------
        printer.addLineaImprimir( "LINEA 01\n"  , TAMANIO_LETRA.PEQUENIO, ALINEAMIENTO.CENTRO       );
        printer.addLineaImprimir( "LINEA 02\n"  , TAMANIO_LETRA.PEQUENIO, ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "LINEA 03\n"  , TAMANIO_LETRA.PEQUENIO, ALINEAMIENTO.DERECHA      );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.PEQUENIO, ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "FIRMA   \n"  , TAMANIO_LETRA.PEQUENIO, ALINEAMIENTO.CENTRO       );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.PEQUENIO, ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "        \n"  , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "\n\n\n\n\n"  , TAMANIO_LETRA.MEDIANO , ALINEAMIENTO.IZQUIERDA    );
        printer.addLineaImprimir( "\n\n\n\n\n"  , TAMANIO_LETRA.PEQUENIO, ALINEAMIENTO.CENTRO       );



        //--------------------------------------------------------------------
        // check if there is paper before continuing
        //--------------------------------------------------------------------
        OperationResult result = printer.checkPaper (   );

        if (result .isSuccess() )
        {
            result = printer.imprimirDocumento      (   );
        }

        Log.i( "TAG", result.toString() );

    }

    static int iRecibo   = 30;
    static int stan     = 102;

    public  class TransactionReceiver extends BroadcastReceiver
    {
        public TransactionReceiver()
        {

        }

        @Override
        public void onReceive(Context context, Intent intent)
        {
            System.out.println("Entro en onReceive");
            if (null != intent)
            {
                if (intent.getAction().equals("COMPLETE_SALE"))
                {
                    System.out.println("Entro en onReceive");
                    //------------------------------------------------------
                    // NO HAY DATOS DISPONBLES
                    //------------------------------------------------------
                    if (null == intent.getExtras())
                    {
                        return;
                    }

                    //------------------------------------------------------
                    // RESPONSE CODE
                    //------------------------------------------------------
                    String responseCode = "";
                    if (intent.getExtras().containsKey(KP_Codes.RESPCODE))
                    {
                        responseCode = intent.getExtras().getString(KP_Codes.RESPCODE);
                    }

                    //------------------------------------------------------
                    // RESPONSE TEXT
                    //------------------------------------------------------
                    String responseMessage = "";
                    if (intent.getExtras().containsKey(KP_Codes.RESPMESSAGE))
                    {
                        responseMessage = intent.getExtras().getString(KP_Codes.RESPMESSAGE);
                    }


                    //------------------------------------------------------
                    // Autorizado
                    //------------------------------------------------------
                    String autorizado = "";
                    if (intent.getExtras().containsKey(KP_Codes.AUTORIZATION))
                    {
                        autorizado = intent.getExtras().getString(KP_Codes.AUTORIZATION);
                    }

                    //------------------------------------------------------
                    // Recibo
                    //------------------------------------------------------
                    String recibo = "";
                    if (intent.getExtras().containsKey(KP_Codes.RECIBO))
                    {
                        recibo = String.valueOf(intent.getExtras().getLong(KP_Codes.RECIBO));
                    }

                    //------------------------------------------------------
                    // HASH
                    //------------------------------------------------------
                    String hash = "";
                    if (intent.getExtras().containsKey(KP_Codes.CARDHASH))
                    {
                        hash = intent.getExtras().getString(KP_Codes.CARDHASH);
                    }

                    //------------------------------------------------------
                    // CardHolder
                    //------------------------------------------------------
                    String cardHolder = "";
                    if (intent.getExtras().containsKey(KP_Codes.CARDHOLDER))
                    {
                        cardHolder = intent.getExtras().getString(KP_Codes.CARDHOLDER);
                    }

                    Log.d("RESULTADO", String.format( "RECIBO = [%s] RSPCODE = [%s] AUT = [%s]" , recibo, responseCode , autorizado ));
                    //NavigationModule.Dieguito=String.format( "RECIBO = [%s] RSPCODE = [%s] AUT = [%s]" , recibo, responseCode , autorizado );

                    //enviarTransaccion( txtHash.getText().toString(), "97", "169", true);

                }
            }
        }
    }

    TransactionReceiver transactionReceiver = new TransactionReceiver();
    // CardOperationsTransactionReceiver transactionReceiver=new TransactionReceiver();

    @Override
    protected void onStart()
    {
        super.onStart();

        IntentFilter filter = new IntentFilter("COMPLETE_SALE");
        System.out.println("Entro en onStart");
        registerReceiver(transactionReceiver, filter);

    }

    @Override
    protected void onStop()
    {
        super.onStop();
        System.out.println("Entro en onStop");
        unregisterReceiver( transactionReceiver );

    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        super.onActivityResult(requestCode, resultCode, data);

        try
        {

            KP_Invocador    kp_invocador    = new KP_Invocador(mposURL,PaymentBACActivity.this);

            Trans_Results resultado       = kp_invocador.getResults(requestCode,resultCode,data);
            System.out.println("Codigo "+resultado.RespCode+" ReqCode "+requestCode+" Resultado "+new Gson().toJson(resultado));

            if  (
                    (requestCode    ==  KP_Invocador.PROCESSREQUESTCLOSE) &&
                            resultCode  ==  Activity.RESULT_OK
            )
            {
                if (null != resultado && null != resultado.RespCode  && resultado.RespCode.equals("00"))
                {
                    paidResponse=new PaidResponse();
                    paidResponse.setCode(0);
                    paidResponse.setStatus("success");
                    paidResponse.setData((resultado));
                    NavigationModule.bactransResultado=new Gson().toJson(paidResponse);

                    System.out.println("Viendo "+new Gson().toJson(paidResponse));
                    msgBoxSaleSuccess("RESULTADO", resultado.MensajeRespuesta, "OK");

                }
                else if (null != resultado && null != resultado.RespCode  && resultado.RespCode.equals("CN"))
                {
                    paidResponse=new PaidResponse();
                    paidResponse.setCode(1);
                    paidResponse.setStatus("error");
                    paidResponse.setData((resultado));
                    NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
                    //NavigationModule.bactransResultado=new Gson().toJson(resultado);
                    msgBoxSaleSuccess("ALERTA", "Hubo inconveniente con el cierre, vuelva a intentar", "OK");

                }

            }
            else if (resultCode  ==  0){
                paidResponse=new PaidResponse();
                paidResponse.setCode(1);
                paidResponse.setStatus("error");
                paidResponse.setData((resultado));
                NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
                //NavigationModule.bactransResultado=new Gson().toJson(resultado);
                msgBoxSaleSuccess("ALERTA", "No fue posible realizar el cierre", "OK");
            }
/*
* Anulacion
* */
            if  (
                    (requestCode    ==  KP_Invocador.PROCESSREQUESTVOID) &&
                            resultCode  ==  Activity.RESULT_OK
            )
            {
                if (null != resultado && null != resultado.RespCode  && resultado.RespCode.equals("00"))
                {
                    paidResponse=new PaidResponse();
                    paidResponse.setCode(0);
                    paidResponse.setStatus("success");
                    paidResponse.setData((resultado));
                    NavigationModule.bactransResultado=new Gson().toJson(paidResponse);

                    System.out.println("Viendo "+new Gson().toJson(paidResponse));
                    msgBoxSaleSuccess("RESULTADO", resultado.MensajeRespuesta, "OK");

                }
                else
                {
                    paidResponse=new PaidResponse();
                    paidResponse.setCode(1);
                    paidResponse.setStatus("error");
                    paidResponse.setData((resultado));
                    NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
                    //NavigationModule.bactransResultado=new Gson().toJson(resultado);
                    msgBoxSaleSuccess("ALERTA", "Hubo inconveniente con la anulacion, vuelva a intentar", "OK");

                }
            }
            else if (resultCode  ==  0){
                paidResponse=new PaidResponse();
                paidResponse.setCode(1);
                paidResponse.setStatus("error");
                paidResponse.setData((resultado));
                NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
                //NavigationModule.bactransResultado=new Gson().toJson(resultado);
                msgBoxSaleSuccess("ALERTA", "No fue posible realizar la anulacion", "OK");
            }



/*
*  Venta
* */

            if  (
                    (requestCode    ==  KP_Invocador.PROCESSREQUESTSALE         ||
                            requestCode    ==  KP_Invocador.PROCESSREQUEST_POINT_SALE  ) &&
                            resultCode  ==  Activity.RESULT_OK
            )
            {


                Log.i("Venta" , String.format("Venta RSP=[%s], Recibo=[%d], STAN=[%s]", data.getStringExtra("RESPCODE"), data.getLongExtra("RECIBO", 0), data.getStringExtra("STAN") ));

                if (null != resultado && null != resultado.RespCode  && resultado.RespCode.equals("00"))
                {
                    paidResponse=new PaidResponse();
                    paidResponse.setCode(0);
                    paidResponse.setStatus("success");
                    paidResponse.setData((resultado));
                    NavigationModule.bactransResultado=new Gson().toJson(paidResponse);

                    System.out.println("Viendo "+new Gson().toJson(paidResponse));
                    msgBoxSaleSuccess("RESULTADO", resultado.MensajeRespuesta, "OK");

                }
                else
                {
                    paidResponse=new PaidResponse();
                    paidResponse.setCode(1);
                    paidResponse.setStatus("error");
                    paidResponse.setData((resultado));
                    NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
                    //NavigationModule.bactransResultado=new Gson().toJson(resultado);
                    msgBoxSaleSuccess("ALERTA", "Hubo inconveniente con el pago, vuelva a intentar", "OK");

                }
                //txtToken.setText(  resultado.TokenID);
            }
            else if (resultCode  ==  0){
                paidResponse=new PaidResponse();
                paidResponse.setCode(1);
                paidResponse.setStatus("error");
                paidResponse.setData((resultado));
                NavigationModule.bactransResultado=new Gson().toJson(paidResponse);
                //NavigationModule.bactransResultado=new Gson().toJson(resultado);
                msgBoxSaleSuccess("ALERTA", "No fue posible realizar la operación", "OK");
            }

            if  (
                    requestCode         ==  KP_Invocador.PROCESSREQUEST_POINT_INQUIRY &&
                            resultCode  ==  Activity.RESULT_OK
            )
            {
                Long puntos = data.getLongExtra("TOTAL_AMOUNT", 0);

                Log.i("Puntos Consuta" , String.format("Puntos = [%s] RSP=[%s], Recibo=[%d], STAN=[%s]", puntos, data.getStringExtra("RESPCODE"), data.getLongExtra("RECIBO", 0), data.getStringExtra("STAN") ));

            }
            //else
            //{
            //    makeSale( showMessages );
            //}

        }
        catch(Exception ex)
        {
            //msgBox("ATENCION", ex.getMessage(),"Continuar");
            //makeSale( showMessages );
        }
    }

    public class PaidResponse
    {
        private String status;
        private int code;
        private Object data;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }
    }


}