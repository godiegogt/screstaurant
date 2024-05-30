package com.kinpos.printer;

import java.util.ArrayList;

public class OperationResult
{
    private boolean success;
    private ArrayList<Message> messages;

    public OperationResult() {
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return this.success;
    }

    public ArrayList<Message> getMessages() {
        return this.messages;
    }

    public void addMessage(String description, MessageType messageType) {
        if(this.messages == null) {
            this.messages = new ArrayList();
        }

        this.messages.add(new Message( description, messageType));
    }

    public String toString()
    {
        String value = "";
        if(null != this.getMessages())
        {
            for(int i = 0; i < this.getMessages().size(); ++i)
            {
                value = value + this.getMessages().get(i).getDescription()  + " ";
            }
        }
        else
        {
            value = "";
        }

        return value;
    }

}
