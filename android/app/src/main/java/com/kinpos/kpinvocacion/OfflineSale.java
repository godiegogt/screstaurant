package com.kinpos.kpinvocacion;

public class OfflineSale
{

    private String  hash                = ""    ;
    private String  recibo              = ""    ;
    private String  stan                = ""    ;
    private boolean processOnline       = true  ;



    public OfflineSale(String hash, String recibo, String stan, boolean processOnline)
    {
        this.hash           = hash          ;
        this.recibo         = recibo        ;
        this.stan           = stan          ;
        this.processOnline  = processOnline ;
    }

    public  String      getHash                 (                           ) {
        return hash;
    }

    public  void        setHash                 (   String hash             ) {
        this.hash = hash;
    }

    public  String      getRecibo               (                           ) {
        return recibo;
    }

    public  void        setRecibo               (   String recibo           ) {
        this.recibo = recibo;
    }

    public  String      getStan                 (                           ) {
        return stan;
    }

    public  void        setStan                 (   String stan             ) {
        this.stan = stan;
    }

    public  boolean     isProcessOnline         (                           ) {
        return processOnline;
    }

    public  void        setProcessOnline        (   boolean processOnline   ) {
        this.processOnline = processOnline;
    }
}
