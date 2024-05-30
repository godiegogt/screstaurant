package com.kinpos.printer;

import android.graphics.Bitmap;

public interface PrinterDevice
{
    OperationResult imprimirDocumento();

    void addLineaImprimir(String var1, TAMANIO_LETRA var2, ALINEAMIENTO var3);

    void addLogoHeader(Bitmap var1);

    OperationResult checkPaper();

}
