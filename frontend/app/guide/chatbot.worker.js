import { pipeline, env } from '@huggingface/transformers';

// Skip local checks for models
env.allowLocalModels = false;
env.useBrowserCache = true;

class ChatbotPipeline {
    static task = 'text-generation';
    static model = 'Xenova/SmolLM-135M-Instruct'; // Much smaller (~270MB)
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    const { messages } = event.data;

    const generator = await ChatbotPipeline.getInstance((x) => {
        self.postMessage(x);
    });

    // Prompt format for SmolLM Instruct
    // <|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant\n
    const prompt = messages.map(m => 
        m.sender === 'user' ? `<|im_start|>user\n${m.text}<|im_end|>\n` : `<|im_start|>assistant\n${m.text}<|im_end|>\n`
    ).join('') + `<|im_start|>assistant\n`;

    const output = await generator(prompt, {
        max_new_tokens: 128,
        temperature: 0.7,
        do_sample: true,
        top_k: 50,
        return_full_text: false,
    });

    // Send the response back to the main thread
    self.postMessage({
        status: 'complete',
        output: output[0].generated_text
    });
});
