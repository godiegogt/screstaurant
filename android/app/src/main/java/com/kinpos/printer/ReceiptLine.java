package com.kinpos.printer;

public class ReceiptLine
{
    String text;
    int textSize;

    public ReceiptLine(String text, int size)
    {
        this.text = text;
        this.textSize = size;
    }

    public ReceiptLine(String linea, TAMANIO_LETRA tamanio, ALINEAMIENTO alineacion)
    {
        String lineaFormateada = "";
        byte fontSize;
        byte spacesToPad;
        switch( tamanio.ordinal() )
        {
            case 1:
                fontSize = 0;
                spacesToPad = 48;
                break;
            case 2:
                fontSize = 2;
                spacesToPad = 16;
                break;
            case 3:
            default:
                fontSize = 1;
                spacesToPad = 32;
        }

        boolean padLeft = true;
        switch(alineacion.ordinal()) {
            case 1:
                lineaFormateada = Utilidad.FillStringWith(linea, ' ', (spacesToPad + linea.length()) / 2, padLeft);
                break;
            case 2:
                lineaFormateada = Utilidad.FillStringWith(linea, ' ', spacesToPad, padLeft);
                break;
            case 3:
            default:
                lineaFormateada = linea;
        }

        this.text = lineaFormateada;
        this.textSize = fontSize;
    }

}
