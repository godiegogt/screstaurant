package com.kinpos.printer;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import com.pax.dal.IDAL;
import com.pax.dal.IPrinter;
import com.pax.dal.entity.EFontTypeAscii;
import com.pax.dal.entity.EFontTypeExtCode;
import com.pax.dal.exceptions.PrinterDevException;
import com.pax.neptunelite.api.NeptuneLiteUser;
import java.util.ArrayList;

public class A920Printer implements PrinterDevice
{
    private String      TAG = "A920Printer"         ;
    private Context     ctx                         ;
    private Bitmap      headerLogo                  ;
    private int         PRN_OK = 0                  ;
    private ArrayList<ReceiptLine> receiptLineTbl   ;
    IPrinter printer;

    public A920Printer(Context ctx)
    {
        this.ctx = ctx;
    }

    public void setContext(Context ctx) {
        this.ctx = ctx;
    }

    public Context getContext() {
        return this.ctx;
    }

    public ArrayList<ReceiptLine> getReceiptLineArray() {
        return this.receiptLineTbl;
    }

    public void setReceiptLineArray(ArrayList<ReceiptLine> receiptLineTbl) {
        this.receiptLineTbl = receiptLineTbl;
    }

    public OperationResult imprimirDocumento()
    {
        OperationResult result = new OperationResult();
        result.setSuccess(true);

        Log.d(this.TAG, "Ejecutando funcion imprimirDocumento");

        if(null == this.ctx)
        {
            Log.d(this.TAG, "imprimirDocumento Context is NULL");
            result.setSuccess(false);
            result.addMessage("imprimirDocumento Context is NULL", MessageType.Error);
            return result;
        }
        else if(this.receiptLineTbl == null)
        {
            Log.d(this.TAG, "receiptLineTbl is NULL");
            result.setSuccess(false);
            result.addMessage("receiptLineTbl is NULL", MessageType.Error);
            return result;
        }
        else if(this.receiptLineTbl.size() <= 0)
        {
            Log.d(this.TAG, "No hay lineas que imprimir");
            result.setSuccess(false);
            result.addMessage("No hay lineas que imprimir. receiptLineTbl.size() = 0", MessageType.Error);
            return result;
        }
        else
        {
            try
            {
                IDAL dal = NeptuneLiteUser.getInstance().getDal(this.getContext());
                if(dal == null)
                {
                    Log.d(this.TAG, "DAL from Neptune is NULL");
                    result.setSuccess(false);
                    result.addMessage("DAL from Neptune is NULL", MessageType.Error);
                    return result;
                }

                if(this.printer == null)
                {
                    this.printer = dal.getPrinter();
                    this.printer.init();
                }

                if(this.headerLogo != null)
                {
                    Log.d(this.TAG, "Imprimiendo Logo");
                    this.printer.printBitmap(this.headerLogo);
                }

                int iRetError;
                for(iRetError = 0; iRetError < this.receiptLineTbl.size(); ++iRetError)
                {
                    ReceiptLine aLine = (ReceiptLine)this.receiptLineTbl.get(iRetError);
                    switch(aLine.textSize)
                    {
                        case 0:
                            this.printer.fontSet(EFontTypeAscii.FONT_8_16, EFontTypeExtCode.FONT_16_16);
                            this.printer.printStr(aLine.text, (String)null);
                            break;
                        case 1:
                            this.printer.fontSet(EFontTypeAscii.FONT_16_24, EFontTypeExtCode.FONT_24_24);
                            this.printer.printStr(aLine.text, (String)null);
                            break;
                        case 2:
                            this.printer.fontSet(EFontTypeAscii.FONT_32_48, EFontTypeExtCode.FONT_32_32);
                            this.printer.printStr(aLine.text, (String)null);
                    }
                }

                iRetError   = this.printer.start();
                if(iRetError != this.PRN_OK && iRetError == 2)
                {
                    result.addMessage("Ponga Papel en el POS", MessageType.Warn);
                    result.setSuccess(false);
                }
            }
            catch (Exception var5)
            {
                if(var5.getMessage() != null)
                {
                    Log.d(this.TAG, var5.getMessage());
                    result.setSuccess(false);
                    result.addMessage(var5.getMessage(), MessageType.Error);
                }
            }

            return result;
        }
    }

    public void addLineaImprimir(String linea, TAMANIO_LETRA tamanio, ALINEAMIENTO alineacion) {
        String lineaFormateada = "";
        if(null == this.receiptLineTbl) {
            this.receiptLineTbl = new ArrayList();
        }

        byte fontSize;
        byte spacesToPad;
        switch( tamanio.ordinal())
        {
            case 0: //PEQUENO
            default:
                fontSize = 0;
                spacesToPad = 48;
                break;
            case 2:  //GRANDE
                fontSize = 2;
                spacesToPad = 16;
                break;

            case 1: //MEDIANO
                fontSize = 1;
                spacesToPad = 32;

                break;
        }

        boolean padLeft = true;
        switch(alineacion.ordinal())
        {
            case 0:
            default:
                lineaFormateada = linea;
                break;
            case 1:
                lineaFormateada = Utilidad.FillStringWith(linea, ' ', (spacesToPad + linea.length()) / 2, padLeft);
                break;
            case 2:
                lineaFormateada = Utilidad.FillStringWith(linea, ' ', spacesToPad, padLeft);
                break;

        }

        this.receiptLineTbl.add(new ReceiptLine(lineaFormateada, fontSize));
    }

    public void addLogoHeader(Bitmap logo) {
        this.headerLogo = logo;
    }

    public OperationResult setGray(int gray)
    {
        OperationResult result = new OperationResult();
        result.setSuccess(true);

        try
        {
            IDAL dal = NeptuneLiteUser.getInstance().getDal(this.getContext());
            if(dal == null)
            {
                Log.d(this.TAG, "DAL from Neptune is NULL");
                result.setSuccess(false);
                result.addMessage("DAL from Neptune is NULL", MessageType.Error);
                return result;
            }

            if(this.printer == null) {
                this.printer = dal.getPrinter();
                this.printer.init();
            }

            this.printer.setGray(gray);
        } catch (PrinterDevException var4)
        {
            var4.printStackTrace();
            result.setSuccess(false);
            result.addMessage(var4.getMessage(), MessageType.Error);
        } catch (Exception var5) {
            var5.printStackTrace();
            result.setSuccess(false);
            result.addMessage(var5.getMessage(), MessageType.Error);
        }

        return result;
    }

    public OperationResult checkPaper()
    {
        OperationResult result = new OperationResult();
        result.setSuccess(true);
        Log.d(this.TAG, "Ejecutando funcion checkPaper");

        try {
            IDAL dal = NeptuneLiteUser.getInstance().getDal(this.getContext());
            if(dal == null)
            {
                Log.d(this.TAG, "DAL from Neptune is NULL");
                result.setSuccess(false);
                result.addMessage("DAL from Neptune is NULL", MessageType.Error);
                return result;
            }

            if(this.printer == null)
            {
                this.printer = dal.getPrinter();
                this.printer.init();
            }

            switch(this.printer.getStatus())
            {
                case 0:
                    result.setSuccess(true);
                    result.addMessage("Ok", MessageType.Info);
                    break;
                case 2:
                    result.setSuccess(false);
                    result.addMessage("Ponga Papel en el dispositivo", MessageType.Warn);
                    break;
                default:
                    result.setSuccess(false);
                    result.addMessage("** ERROR **", MessageType.Error);
            }
        }
        catch (Exception var3)
        {
            if(var3.getMessage() != null)
            {
                Log.d(this.TAG, var3.getMessage());
                result.setSuccess(false);
                result.addMessage(var3.getMessage(), MessageType.Error);
            }
        }

        return result;
    }
}
