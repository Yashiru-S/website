import openai
import gradio

openai.api_key = "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"

messages = [{"role": "system", "content": "You are a friend"}]

def CustomChatGPT(user_input):
    messages.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages)
    reply = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": reply})
    return reply

demo = gradio.Interface(fn=CustomChatGPT, inputs = "text", outputs = "text", title = "Custom ChatBot")

demo.launch()