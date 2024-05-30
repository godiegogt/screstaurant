package com.kinpos.printer;

public class Message
{
    private String description;
    private MessageType messageType;


    public Message(String description, MessageType messageType) {

        this.description = description;
        this.messageType = messageType;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MessageType getMessageType() {
        return this.messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

}
