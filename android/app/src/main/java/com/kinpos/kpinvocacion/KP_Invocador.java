package com.kinpos.kpinvocacion;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import java.util.List;

import static android.content.ContentValues.TAG;
import static android.content.Intent.ACTION_MAIN;

public class KP_Invocador
{

    public static final int PROCESS_REQUEST_COMPLETE_SALE           = 5500  ;
    public static final int PROCESSREQUESTSALE                      = 5499  ;
    public static final int PROCESSREQUESTVOID                      = 5498  ;
    public static final int PROCESSREQUESTCLOSE                     = 5497  ;
    public static final int PROCESSREQUESTRESEND                    = 5496  ;

    public static final int PROCESSREQUEST_POINT_INQUIRY            = 5501  ;
    public static final int PROCESSREQUEST_POINT_SALE               = 5502  ;
    public static final int PROCESSREQUEST_INSTALMENT_SALE_INTRA    = 5503  ;
    public static final int PROCESSREQUEST_INSTALMENT_SALE_EXTRA    = 5504  ;

    public static final int PROCESSREQUEST_CHECK_IN                 = 5505  ;
    public static final int PROCESSREQUEST_CHECK_IN_INC             = 5506  ;
    public static final int PROCESSREQUEST_CHECK_OUT                = 5507  ;
    public static final int PROCESSREQUEST_CHECK_OUT_XP             = 5508  ;

    private String          mposURL                                     ;
    private Activity        callerActivity                              ;

    public static final String ACTION_POINTS_SALE                   = "POINTS_SALE"                 ;
    public static final String ACTION_POINTS_INQUIRY                = "POINTS_INQUIRY"              ;
    public static final String ACTION_INSTALLMENT_INQUIRY_INTRA     = "INSTALLMENT_SALE_INTRA"      ;
    public static final String ACTION_INSTALLMENT_INQUIRY_EXTRA     = "INSTALLMENT_SALE_EXTRA"      ;
    public static final String ACTION_CHECK_IN                      = "CHECK_IN"                    ;
    public static final String ACTION_CHECK_IN_INC                  = "CHECK_IN_INC"                ;
    public static final String ACTION_CHECK_OUT                     = "CHECK_OUT"                   ;
    public static final String ACTION_CHECK_OUT_XP                  = "CHECK_OUT_XP"                ;


    public KP_Invocador(String mposURL, Activity callerActivity)
    {
        this.mposURL        = mposURL           ;
        this.callerActivity = callerActivity    ;
    }



    public void KP_Sale(String user, String password, String deviceID, Double montoBase, Double montoTax, Double montoTip, String email, String nroMovil)
    {
        montoBase   = Double.valueOf(montoBase.doubleValue  () * 100.0D);
        montoTax    = Double.valueOf(montoTax.doubleValue   () * 100.0D);
        montoTip    = Double.valueOf(montoTip.doubleValue   () * 100.0D);

        this.KP_Sale(user, password, deviceID, montoBase.longValue(), montoTax.longValue(), montoTip.longValue(), email, nroMovil);
    }

    public void KP_Sale                     (   String          user            , String password, String deviceID, long montoBase, long montoTax, long montoTip, String email, String nroMovil)
    {
        Trans_Params transP = new Trans_Params();
        transP.user         = user      ;
        transP.password     = password  ;
        transP.deviceID     = deviceID  ;
        transP.montoBase    = montoBase ;
        transP.montoTAX     = montoTax  ;
        transP.montoTIP     = montoTip  ;
        transP.email        = email     ;
        transP.phone        = nroMovil  ;
        this.KP_Sale(transP, PROCESSREQUESTSALE);
    }

    public void KP_Sale                     (   String          user            , String password, String deviceID, long montoBase, long montoTax, long montoTip, String email, String nroMovil, boolean showMessages)
    {
        Trans_Params transP = new Trans_Params();
        transP.user         = user              ;
        transP.password     = password          ;
        transP.deviceID     = deviceID          ;
        transP.montoBase    = montoBase         ;
        transP.montoTAX     = montoTax          ;
        transP.montoTIP     = montoTip          ;
        transP.email        = email             ;
        transP.phone        = nroMovil          ;
        transP.showMessages = showMessages      ;
        this.KP_Sale(transP, PROCESSREQUESTSALE);
    }

    public void KP_Sale                     (   Trans_Params    transParam      , int requestCode)
    {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        ComponentName cn = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");
        intent.setComponent(cn);


        intent.putExtra("EXTERNAL_APP"  , true            );
        intent.putExtra("ACTION"        , "SALE"          );
        intent.putExtra("USER"          , transParam.user       );
        intent.putExtra("PASSWORD"      , transParam.password   );
        intent.putExtra("DEVICEID"      , transParam.deviceID   );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase  );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX   );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP   );
        intent.putExtra("EMAIL"         , transParam.email      );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages);

        this.callerActivity.startActivityForResult(intent, requestCode);
    }

    public void KP_Point_Inquiry            (   String          user            , String password, String deviceID, String planPuntos, boolean showMessages)
    {
        Trans_Params transP = new Trans_Params()                    ;
        transP.user         = user                                  ;
        transP.password     = password                              ;
        transP.deviceID     = deviceID                              ;
        transP.montoBase    = 0                                     ;
        transP.montoTAX     = 0                                     ;
        transP.montoTIP     = 0                                     ;
        transP.email        = ""                                    ;
        transP.phone        = ""                                    ;
        transP.planPuntos   = planPuntos                            ;
        transP.showMessages = showMessages                          ;

        this.KP_Point_Inquiry(transP, PROCESSREQUEST_POINT_INQUIRY) ;
    }

    public void KP_Point_Inquiry            (   Trans_Params    transParam      , int requestCode)
    {
        Intent          intent  = new Intent(Intent.ACTION_VIEW);
        ComponentName   cn      = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");

        intent.setComponent(cn);

        intent.putExtra("EXTERNAL_APP"  , true                   );
        intent.putExtra("ACTION"        , ACTION_POINTS_INQUIRY         );
        intent.putExtra("USER"          , transParam.user               );
        intent.putExtra("PASSWORD"      , transParam.password           );
        intent.putExtra("DEVICEID"      , transParam.deviceID           );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase          );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX           );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP           );
        intent.putExtra("EMAIL"         , transParam.email              );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages       );
        intent.putExtra("PLAN_POINT"    , transParam.planPuntos       );

        this.callerActivity.startActivityForResult(intent, requestCode);
    }

    public void KP_Installment_Sale_Intra   (   Trans_Params    transParam )
    {
        Intent          intent  = new Intent(Intent.ACTION_VIEW);
        ComponentName   cn      = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");

        intent.setComponent(cn);

        intent.putExtra("EXTERNAL_APP"  , true                          );
        intent.putExtra("ACTION"        , ACTION_INSTALLMENT_INQUIRY_INTRA    );
        intent.putExtra("USER"          , transParam.user               );
        intent.putExtra("PASSWORD"      , transParam.password           );
        intent.putExtra("DEVICEID"      , transParam.deviceID           );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase          );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX           );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP           );
        intent.putExtra("EMAIL"         , transParam.email              );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages       );
        intent.putExtra("PLAZOS"        , transParam.plazo              );
        intent.putExtra("TIPO_FINANCIAMIENTO"    ,     "CR"         );

        this.callerActivity.startActivityForResult(intent, PROCESSREQUEST_INSTALMENT_SALE_INTRA);
    }

    public void KP_Installment_Sale_Extra   (   Trans_Params    transParam )
    {
        Intent          intent  = new Intent(Intent.ACTION_VIEW);
        ComponentName   cn      = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");

        intent.setComponent(cn);

        intent.putExtra("EXTERNAL_APP"  , true                          );
        intent.putExtra("ACTION"        , ACTION_INSTALLMENT_INQUIRY_EXTRA    );
        intent.putExtra("USER"          , transParam.user               );
        intent.putExtra("PASSWORD"      , transParam.password           );
        intent.putExtra("DEVICEID"      , transParam.deviceID           );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase          );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX           );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP           );
        intent.putExtra("EMAIL"         , transParam.email              );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages       );
        intent.putExtra("PLAZOS"    , transParam.plazo              );
        intent.putExtra("TIPO_FINANCIAMIENTO"    ,     "EX"         );



        this.callerActivity.startActivityForResult(intent, PROCESSREQUEST_INSTALMENT_SALE_EXTRA);
    }

    public void KP_Point_Sale               (   String          user            , String password, String deviceID, long amount, String planPuntos, boolean showMessages)
    {
        Trans_Params transP = new Trans_Params()                    ;
        transP.user         = user                                  ;
        transP.password     = password                              ;
        transP.deviceID     = deviceID                              ;
        transP.montoBase    = amount                                ;
        transP.montoTAX     = 0                                     ;
        transP.montoTIP     = 0                                     ;
        transP.email        = ""                                    ;
        transP.phone        = ""                                    ;
        transP.planPuntos   = planPuntos                            ;
        transP.showMessages = showMessages                          ;

        this.KP_Point_Sale(transP, PROCESSREQUEST_POINT_SALE) ;
    }

    public void KP_Point_Sale               (   Trans_Params    transParam      , int requestCode)
    {
        Intent          intent  = new Intent(Intent.ACTION_VIEW);
        ComponentName   cn      = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");

        intent.setComponent(cn);

        intent.putExtra("EXTERNAL_APP"  , true                   );
        intent.putExtra("ACTION"        , ACTION_POINTS_SALE            );
        intent.putExtra("USER"          , transParam.user               );
        intent.putExtra("PASSWORD"      , transParam.password           );
        intent.putExtra("DEVICEID"      , transParam.deviceID           );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase          );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX           );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP           );
        intent.putExtra("EMAIL"         , transParam.email              );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages       );
        intent.putExtra("PLAN_POINT"    , transParam.planPuntos         );

        this.callerActivity.startActivityForResult(intent, requestCode);
    }

    /***
     * Para realizar una check-in necesitamos los siguientes datos de entrada:
     * 1. Monto
     * 2. Tip       (opcional)
     * 3. Tax       (opcional)
     * 4. Numero de Reserva
     * 5. Check in Password (opcional)
     * @param transParam
     */
    public void KP_CheckIn                  (   Trans_Params    transParam )
    {
        Intent          intent  = new Intent(Intent.ACTION_VIEW);
        ComponentName   cn      = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");

        intent.setComponent(cn);

        intent.putExtra("EXTERNAL_APP"  , true                    );
        intent.putExtra("ACTION"        , ACTION_CHECK_IN               );
        intent.putExtra("USER"          , transParam.user               );
        intent.putExtra("PASSWORD"      , transParam.password           );
        intent.putExtra("DEVICEID"      , transParam.deviceID           );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase          );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX           );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP           );
        intent.putExtra("EMAIL"         , transParam.email              );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages       );
        intent.putExtra("NORESERVA"     , transParam.numeroReserva      );
        intent.putExtra("CHK_PWD"       , transParam.checkIn_Password   );

        this.callerActivity.startActivityForResult(intent, PROCESSREQUEST_CHECK_IN);
    }

    /***
     * Para realizar un incremento de check-in necesitamos los siguientes datos de entrada:
     * 1. Monto
     * 2. Tip       (opcional)
     * 3. Tax       (opcional)
     * 4. Ultimos cuatro digitos
     * 5. Numero de Reserva
     * 6. Pregunta si desea utilizar la misma tarjeta (boolean)
     * @param transParam
     */
    public void KP_CheckIn_Increment        (   Trans_Params    transParam )
    {
        Intent          intent  = new Intent(Intent.ACTION_VIEW);
        ComponentName   cn      = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");

        intent.setComponent(cn);

        intent.putExtra("EXTERNAL_APP"  , true                        );
        intent.putExtra("ACTION"        , ACTION_CHECK_IN_INC               );
        intent.putExtra("USER"          , transParam.user                   );
        intent.putExtra("PASSWORD"      , transParam.password               );
        intent.putExtra("DEVICEID"      , transParam.deviceID               );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase              );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX               );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP               );
        intent.putExtra("EMAIL"         , transParam.email                  );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages           );
        intent.putExtra("NORESERVA"     , transParam.numeroReserva          );
        intent.putExtra("CHK_PWD"       , transParam.checkIn_Password       );
        intent.putExtra("LAST4"         , transParam.ultimosCuatro          );
        intent.putExtra("USE_SAME_CARD" , transParam.utilizarMismaTarjeta   );


        this.callerActivity.startActivityForResult(intent, PROCESSREQUEST_CHECK_IN_INC);
    }

    /***
     * Para realizar una check-out necesitamos los siguientes datos de entrada:
     * 1. Monto
     * 2. Tip       (opcional)
     * 3. Tax       (opcional)
     * 4. Numero de Reserva
     * 5. Check in Password (opcional)
     * @param transParam
     */
    public void KP_CheckOut                 (   Trans_Params    transParam )
    {
        Intent          intent  = new Intent(Intent.ACTION_VIEW);
        ComponentName   cn      = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");

        intent.setComponent(cn);

        intent.putExtra("EXTERNAL_APP"  , true                    );
        intent.putExtra("ACTION"        , ACTION_CHECK_OUT              );
        intent.putExtra("USER"          , transParam.user               );
        intent.putExtra("PASSWORD"      , transParam.password           );
        intent.putExtra("DEVICEID"      , transParam.deviceID           );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase          );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX           );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP           );
        intent.putExtra("EMAIL"         , transParam.email              );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages       );
        intent.putExtra("NORESERVA"     , transParam.numeroReserva      );
        intent.putExtra("CHK_PWD"       , transParam.checkIn_Password   );


        this.callerActivity.startActivityForResult(intent, PROCESSREQUEST_CHECK_OUT);
    }

    /***
     * Para realizar una check-out necesitamos los siguientes datos de entrada:
     * 1. Monto
     * 2. Tip       (opcional)
     * 3. Tax       (opcional)
     * 4. Numero de Reserva
     * 5. Check in Password (opcional)
     * @param transParam
     */
    public void KP_CheckOut_Express         (   Trans_Params    transParam )
    {
        Intent          intent  = new Intent(Intent.ACTION_VIEW);
        ComponentName   cn      = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");

        intent.setComponent(cn);

        intent.putExtra("EXTERNAL_APP"  , true                    );
        intent.putExtra("ACTION"        , ACTION_CHECK_OUT_XP           );
        intent.putExtra("USER"          , transParam.user               );
        intent.putExtra("PASSWORD"      , transParam.password           );
        intent.putExtra("DEVICEID"      , transParam.deviceID           );
        intent.putExtra("AMOUNT_BASE"   , transParam.montoBase          );
        intent.putExtra("AMOUNT_TAX"    , transParam.montoTAX           );
        intent.putExtra("AMOUNT_TIP"    , transParam.montoTIP           );
        intent.putExtra("EMAIL"         , transParam.email              );
        intent.putExtra("SHOW_MSG"      , transParam.showMessages       );
        intent.putExtra("NORESERVA"     , transParam.numeroReserva      );
        intent.putExtra("CHK_PWD"       , transParam.checkIn_Password   );
        intent.putExtra("LAST4"         , transParam.ultimosCuatro      );
        intent.putExtra("SAMECARD"      , transParam.utilizarMismaTarjeta      );


        this.callerActivity.startActivityForResult(intent, PROCESSREQUEST_CHECK_OUT_XP);
    }

    public void KP_Void(String user, String password, String deviceID, String tokenId, String email, String nroMovil) {
        Trans_Params transP = new Trans_Params();
        transP.user = user;
        transP.password = password;
        transP.deviceID = deviceID;
        transP.TokenID = tokenId;
        transP.email = email;
        transP.phone = nroMovil;
        this.KP_Void(transP, PROCESSREQUESTVOID);
    }

    public void KP_Void(String user, String password, String deviceID, String tokenId, String email, String nroMovil, String recibo) {
        Trans_Params transP = new Trans_Params();
        transP.user = user;
        transP.password = password;
        transP.deviceID = deviceID;
        transP.TokenID = tokenId;
        transP.email = email;
        transP.phone = nroMovil;
        transP.recibo = recibo;
        this.KP_Void(transP, PROCESSREQUESTVOID);
    }

    public void KP_Void(Trans_Params transParam, int requestCode)
    {
        Intent intent = new Intent(Intent.ACTION_MAIN, (Uri)null);
        ComponentName cn = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");
        intent.setComponent(cn);
        intent.putExtra("EXTERNAL_APP", true);
        intent.putExtra("ACTION", "VOID");
        intent.putExtra("USER", transParam.user);
        intent.putExtra("PASSWORD", transParam.password);
        intent.putExtra("DEVICEID", transParam.deviceID);
        intent.putExtra("TOKEN_ID", transParam.TokenID);
        intent.putExtra("EMAIL", transParam.email);
        intent.putExtra("PHONE", transParam.phone);
        intent.putExtra("RECIBO", transParam.recibo);
        this.callerActivity.startActivityForResult(intent, requestCode);
    }


    public void KP_Complete_Sale(String hash, String recibo, String stan, boolean processOnline)
    {
        Trans_Params transP = new Trans_Params();
        transP.stan             = stan          ;
        transP.recibo           = recibo        ;
        transP.hash             = hash          ;
        transP.processOnline    = processOnline ;

        this.KP_Complete_Sale(transP, PROCESS_REQUEST_COMPLETE_SALE );
    }

    public void KP_Complete_Sale(Trans_Params transParam, int requestCode)
    {
        Intent intent = new Intent(Intent.ACTION_MAIN, (Uri)null);
        ComponentName cn = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalCompleteSaleActivity");
        intent.setComponent(cn);
        intent.putExtra("EXTERNAL_APP"  , true);
        intent.putExtra("ACTION"        , "COMPLETE_SALE");

        intent.putExtra("RECIBO"        , transParam.recibo         );
        intent.putExtra("STAN"          , transParam.stan           );
        intent.putExtra("HASH"          , transParam.hash           );
        intent.putExtra("PROCESS_ONLINE", transParam.processOnline  );


        this.callerActivity.startActivity(intent);

    }


    public void KP_Close(String user, String password, String deviceID) {
        Trans_Params transP = new Trans_Params();
        transP.user = user;
        transP.password = password;
        transP.deviceID = deviceID;
        this.KP_Close(transP, PROCESSREQUESTCLOSE);
    }

    public void KP_Close(Trans_Params transParam, int requestCode) {
        Intent intent = new Intent(Intent.ACTION_MAIN, (Uri)null);
        ComponentName cn = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");
        intent.setComponent(cn);
        intent.putExtra("EXTERNAL_APP", true);
        intent.putExtra("ACTION", "CLOSE");
        intent.putExtra("USER", transParam.user);
        intent.putExtra("PASSWORD", transParam.password);
        intent.putExtra("DEVICEID", transParam.deviceID);
        this.callerActivity.startActivityForResult(intent, requestCode);
    }

    public void KP_Resend(String user, String password, String deviceID, String tokenId, String email, String nroMovil) {
        new Intent(Intent.ACTION_MAIN, (Uri)null);
        Trans_Params transP = new Trans_Params();
        transP.user = user;
        transP.password = password;
        transP.deviceID = deviceID;
        transP.TokenID = tokenId;
        transP.email = email;
        transP.phone = nroMovil;
        this.KP_Resend(transP, PROCESSREQUESTRESEND);
    }

    public void KP_Resend(Trans_Params transParam, int requestCode) {
        try {
            Intent intent = new Intent(Intent.ACTION_MAIN, (Uri)null);
            ComponentName cn = new ComponentName(this.mposURL, this.mposURL + ".ACTIVITYS.ExternalActivity");
            intent.setComponent(cn);
            intent.putExtra("EXTERNAL_APP", true);
            intent.putExtra("ACTION", "RESEND");
            intent.putExtra("USER", transParam.user);
            intent.putExtra("PASSWORD", transParam.password);
            intent.putExtra("DEVICEID", transParam.deviceID);
            intent.putExtra("TOKEN_ID", transParam.TokenID);
            intent.putExtra("EMAIL", transParam.email);
            intent.putExtra("PHONE", transParam.phone);
            this.callerActivity.startActivityForResult(intent, requestCode);
        } catch (Exception var5) {
            Log.e("RESEND", var5.getMessage());
        }

    }

    public Trans_Results getResults(int requestCode, int resultCode, Intent data) {
        Trans_Results r = new Trans_Results();
        r.requestCode = requestCode;
        r.resultCode = resultCode;
        if(requestCode == PROCESSREQUESTSALE)
        {
            if(resultCode == -1)
            {
                /*Bundle bundle = data.getExtras();

                for (String key : bundle.keySet()) {
                    Object value = bundle.get(key);
                    Log.d(TAG, String.format("%s %s (%s)", key,
                            value.toString(), value.getClass().getName()));
                    System.out.println("Valores " + key+" "+value.toString()+" "+value.getClass().getName());
                }*/

                r.RespCode              = data.getStringExtra("RESPCODE");
                r.NumeroAutorizacion    = data.getStringExtra("AUTORIZATION");
                r.TokenID               = data.getStringExtra("TOKENID");
                r.PanMasked             = data.getStringExtra("PANMASKED");
                r.Stan                  = data.getStringExtra("STAN");
                r.TerminalID            = data.getStringExtra("TERMINALID");
                r.cardHolder          = data.getStringExtra("CARDHOLDER");
                r.rrn              =    data.getStringExtra("RRN");
                r.recibo                 = data.getLongExtra("RECIBO",0);
                r.totalAmount=data.getLongExtra("TOTAL_AMOUNT",0);
                r.MensajeRespuesta      = "Autorizacion: " + r.NumeroAutorizacion + "\n Tarjeta: " + r.PanMasked + "\n Recibo: " + r.Stan;
            }
            else
            {
                r.RespCode = "ER";
                if(data != null)
                {
                    r.RespCode = data.getStringExtra("RESPCODE");
                    r.MensajeRespuesta = data.getStringExtra("RESPMESSAGE");
                } else {
                    r.MensajeRespuesta = "Error al invocar la aplicacion Movipago (" + this.mposURL + ")";
                }

                r.TokenID = "";
            }
        } else if(requestCode == PROCESSREQUESTVOID) {
            if(resultCode == -1) {
                /*Bundle bundle = data.getExtras();

                for (String key : bundle.keySet()) {
                    Object value = bundle.get(key);
                    Log.d(TAG, String.format("%s %s (%s)", key,
                            value.toString(), value.getClass().getName()));
                    System.out.println("Valores " + key+" "+value.toString()+" "+value.getClass().getName());
                }*/
                r.RespCode = "00";
                r.MensajeRespuesta = data.getStringExtra("RESPMESSAGE");
                r.NumeroAutorizacion = data.getStringExtra("AUTORIZATION");
                r.TokenID               = data.getStringExtra("TOKENID");
                r.PanMasked             = data.getStringExtra("PANMASKED");
                r.Stan                  = data.getStringExtra("STAN");
                r.TerminalID            = data.getStringExtra("TERMINALID");
                r.cardHolder          = data.getStringExtra("CARDHOLDER");
                r.rrn              =    data.getStringExtra("RRN");
                r.recibo                 = data.getLongExtra("RECIBO",0);
                r.totalAmount=data.getLongExtra("TOTAL_AMOUNT",0);
                if(r.MensajeRespuesta == null || r.MensajeRespuesta.isEmpty()) {
                    r.MensajeRespuesta = "Anulacion correcta";
                }

                //if(r.NumeroAutorizacion != null && !r.NumeroAutorizacion.isEmpty()) {
                //    r.NumeroAutorizacion = r.NumeroAutorizacion;
                //}
            } else {
                r.MensajeRespuesta = "Cancelado";
                if(data != null) {
                    r.RespCode = data.getStringExtra("RESPCODE");
                    r.MensajeRespuesta = data.getStringExtra("RESPMESSAGE") + " (" + r.RespCode + ")";
                }
            }
        } else if(requestCode == PROCESSREQUESTCLOSE) {
            if(resultCode == -1) {
                /*Bundle bundle = data.getExtras();

                for (String key : bundle.keySet()) {
                    Object value = bundle.get(key);
                    Log.d(TAG, String.format("%s %s (%s)", key,
                            value.toString(), value.getClass().getName()));
                    System.out.println("Valores " + key+" "+value.toString()+" "+value.getClass().getName());
                }*/
                //r.TerminalID            = data.getStringExtra("TERMINALID");
                //r.totalAmount=data.getLongExtra("TOTAL_AMOUNT",0);
                r.RespCode = "00";
                r.MensajeRespuesta = "Cierre realizado";
            } else if(data != null) {
                r.RespCode = data.getStringExtra("RESPCODE");
                r.MensajeRespuesta = data.getStringExtra("RESPMESSAGE");
                r.MensajeRespuesta = r.MensajeRespuesta + " (" + r.RespCode + ")";
            } else {
                r.RespCode = "ER";
                r.MensajeRespuesta = "No se realizo el cierre";
            }
        } else if(requestCode == PROCESSREQUESTRESEND)
        {
            if(resultCode == -1)
            {
                r.RespCode = "00";
                r.MensajeRespuesta = "Recibo enviado";
            }
            else if(data == null)
            {
                r.RespCode = "ER";
                r.MensajeRespuesta = "No se pudo enviar";
            }
            else
            {
                r.RespCode = data.getStringExtra("RESPCODE");
                r.MensajeRespuesta = data.getStringExtra("RESPMESSAGE");
                r.MensajeRespuesta = r.MensajeRespuesta + "(" + r.RespCode + ")";
            }
        }

        return r;
    }

}
