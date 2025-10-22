---
layout: page
title: Experimental Evaluation of RAG Systems (FYP)
description: An in-depth Final Year Project evaluating Retrieval-Augmented Generation (RAG) systems.
img: /assets/img/1_project.jpg
importance: 1
category: school
github: https://github.com/MarcusO17/RAG-FYP2024
---

An in-depth Final Year Project that evaluates the performance of Retrieval-Augmented Generation (RAG) systems. This study systematically benchmarks various LLMs (Llama3, Gemma2, GPT-4o Mini) across different RAG complexities (Naive vs. Advanced) on standard datasets like SQuAD and MS MARCO, focusing on performance metrics and hallucination reduction.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/1_project.jpg' | relative_url }}" alt="RAG System Diagram"/>
    </div>
</div>
---

## establishing factual rigor: why rag is essential for llm-powered knowledge bases

the rapid adoption of **Large Language Models (LLMs)** for information retrieval has exposed a critical vulnerability: their inherent unreliability when dealing with factual or time-sensitive data. In the context of building a **Personal Knowledge Base (PKB)**, where integrity and accuracy are paramount, this issue—manifesting as **hallucinations** and **outdated knowledge**—renders standalone LLMs fundamentally unfit.

my Final Year Project addressed this challenge directly by evaluating **Retrieval-Augmented Generation (RAG)** as a solution to enhance the factual accuracy and viability of LLMs for PKB applications. the core finding is clear: RAG is not merely an improvement; it is a transformative architectural necessity for trustworthy AI-driven knowledge management.

---

## quantitative evidence: rag’s impact on factual accuracy

the project used a structured evaluation comparing the performance of a standalone LLM (**Llama 3 8B**) against two RAG-enabled pipelines (**Naïve RAG** and **Advanced RAG**) (Okay, these architectures are explicitly stated as such in Gao et al., 2023 based on their components.) on a curated Question-Answering (QA) dataset derived from the industry benchmarks **MS MARCO** and **SQUAD**.

the results demonstrated a dramatic shift in reliability:

* **No RAG Baseline:** The standard Llama 3 8B, relying solely on its **parametric knowledge**, achieved a poor **$57.81\%$** factual accuracy.
* **Advanced RAG Performance:** By incorporating external, non-parametric knowledge retrieved from the knowledge base, the Advanced RAG solution achieved **$87.5\%$** factual accuracy.

This represents an absolute increase of $29.69$ percentage points over its own baseline model, and a measured improvement of **$34-50\%$** over popular conventional LLMs tested, including GPT-4o-mini and Mixtral-8x7b. the key takeaway here is that RAG effectively grounds the LLM's generation process, significantly mitigating the occurrence of fact-conflicting hallucinations.

| Method | Accuracy | Precision | Recall | F1 Score |
| :--- | :--- | :--- | :--- | :--- |
| **Advanced RAG** | **0.867** | **0.386** | **0.696** | **0.442** |
| Naïve RAG | 0.836 | 0.359 | 0.692 | 0.416 |
| No RAG (Llama 3 8B) | 0.578 | 0.239 | 0.396 | 0.266 |
| GPT4o-mini | 0.625 | 0.130 | 0.438 | 0.182 |
| Mixtral-8x7b | 0.609 | 0.077 | 0.442 | 0.117 |


further analysis using token-level metrics confirmed the Advanced RAG as the superior performer, demonstrating that it produces answers of higher quality and fidelity to the target ground truth, beyond simple binary accuracy.

---

## the practical fix for outdated knowledge

one of the intrinsic challenges for LLMs is their reliance on static training data, leading to inevitable obsolescence over time. RAG provides a robust, dynamic solution.

in an experiment testing the retrieval of time-sensitive financial data, the standalone LLM was unable to provide correct, up-to-date information, giving old figures and even identifying a resigned CEO. the RAG solution, however, successfully utilized a newly added document to provide current stock prices and revenue figures.

This demonstrates RAG’s capability to partially overcome the LLM’s **Knowledge Cutoff** by serving as an immediately mutable knowledge layer. this ability is crucial for PKBs that handle dynamic information, allowing individuals to maintain the ability to provide up-to-date information without requiring constant, expensive model retraining.

---

## architectural efficiency and accessibility

while RAG enhances performance, the computational cost of running LLMs remains a barrier, especially for individuals. my solution adopted a strategy focused on using high-efficiency infrastructure:

* **Groq LPUs:** Leveraging Groq's specialized **Language Processing Units (LPUs)** provided exceptionally high throughput, averaging **$259.86$ Tokens Per Second (TPS)** in performance tests. this is roughly $4.8$ times the throughput of the best-performing consumer GPU (RTX 4090) and demonstrates the viability of external inference services for delivering production-level AI economically.
* **Efficient Component Selection:** Choosing high-performing yet resource-light models like **Snowflake's arctic-embed-m** embedding model and **mixedbread.ai's mxbai-embed-large-v1** reranker were key design choices that maintained high performance while mitigating local hardware constraints.

---

## reflection: limitations and future work

the Advanced RAG architecture, incorporating **Semantic Chunking** and a **Reranker**, proved superior in this open-domain QA setting. however, it's important to acknowledge that iterative cycles, while generally beneficial, don't guarantee universally better results. The retrieval component plays a large factor in the success of the pipeline. Hence all these new components (reranker, retrieval) that has been added need to be measured, logged and evaluated for consistency and accuracy.

future enhancements could focus on more advanced RAG modalities, such as implementing **Knowledge Graph RAG (KG-RAG)**, which utilizes explicit semantic relationships between data points, or incorporating multi-modal LLMs for processing complex inputs like images and tables to reduce information loss during the ingestion pipeline.

the research establishes RAG as the definitive architectural choice for integrating reliable AI into personal knowledge management systems.




rag vs. the liars: making llms factually credible
my whole project was basically setting up a showdown: a normal, standalone large language model (LLM) versus the same LLM when its answers are grounded in an external, trustworthy knowledge base via RAG. the underlying LLM for the main tests was llama 3 8b, which is a powerhouse for its size, but it's still a "closed-book" learner—it can only tell you what it memorized during training.

the core problem: unreliable memory
it turns out, letting an LLM answer solely from its parametric memory (the weights it learned during training) is a coin flip.

in my structured testing using a curated question-answering (qa) dataset built from ms marco and squad (two big-name NLP benchmarks), the raw llama 3 8b (the "no rag" control group) only hit 57.81% factual accuracy . that's a failing grade for a knowledge system. i even saw some classic hallucinations. for instance, when asked who the ceo of maybank was (a malaysian banking group), the non-rag llama 3 confidently gave the previous ceo who resigned in 2022, even though the current ceo has been in place since before the model's public knowledge cutoff. a small but crucial piece of outdated, fact-conflicting knowledge.


the solution: augmenting the facts
RAG completely flips the script. instead of letting the LLM guess from old memory, we feed it freshly indexed, relevant documents (our non-parametric memory) right into the prompt, giving it an "open book" to answer from.

i tested two versions of the RAG pipeline:


naïve rag: a basic setup using straightforward chunking (splitting docs into fixed-size sentences).



advanced rag: adding in smarter tech like semantic chunking (splitting based on meaningful content) and a reranker (to sort the retrieved chunks by actual relevance).




the results weren't just good; they were transcendent:


naïve rag jumped to 83.59% accuracy.


advanced rag boosted that further to 87.5% factual accuracy.

that 87.5% figure for the advanced RAG represents a massive 50% improvement in accuracy over its own non-rag baseline (llama 3 8b) . compared to other conventional models like gpt-4o mini (62.5% accuracy) , my simple RAG pipeline gave a 34% factual accuracy improvement. numbers that big show it's more than a tweak; it's a fundamental fix to the problem of LLM reliability for serious applications.




fixing time-sensitive data
the ability of RAG to inject new facts also solves the outdated knowledge problem. i did a quick experiment using a PDF of maybank's financial info dated november 2024—well after llama 3's public march 2023 cutoff.


the standalone LLM answered with disclaimers or old, incorrect values (like the wrong ceo) . the RAG-enabled version, however, successfully provided the up-to-date rm 10.40 stock price and the current rm 6.96b quarterly revenue for jun 2024, directly from the embedded document . it's basically a live knowledge update for the LLM, on the fly, without the cost and complexity of fine-tuning or re-training the whole model.




implementation notes: groq lpus and low-spec heroes
a big barrier for us self-studiers and hobbyists is hardware. i was working with an nvidia gtx 1070 with only 8gb of vram . running a decent 7b-8b parameter model locally is a headache, even with quantization tricks like llama.cpp.


that's why i pivoted to groqcloud. instead of relying on a gpu, groq uses specialized language processing units (lpus) . to give you an idea of the speed difference, my RAG solution on groq's hardware hit an average of 259.86 tokens per second (tps) in performance tests . compare that to top-end consumer gpus like the rtx 4090, which manages about 54.34 tps on the same model—groq gave me nearly five times the throughput.



this accessibility is huge. it meant i could prototype with top-tier performance without needing a 10,000 machine. it democratizes the capability to run high-performance AI systems, making RAG a genuinely practical solution for independent developers.

reflection: what's next for my knowledge base?
what started as a technical project about RAG ended up being a deep dive into the philosophy of truth and utility in AI. the fact that a simple framework can take an LLM's factual accuracy from a mediocre 57% to an authoritative 87% is a massive win for reliability. RAG isn't just an option; it's practically a requirement for using LLMs in any context that demands trust.

i'm still playing with the idea of moving beyond simple document chunks. maybe exploring a knowledge graph rag (kg-rag) system, which uses explicit relationships between data points instead of just semantic similarity, would capture the context even better . there's also hyde (hypothetical document embeddings), where the llm drafts a perfect-sounding, fake answer first to find the most relevant document chunks. sounds like sci-fi, but apparently, it works!


what have you found to be the biggest killer of credibility for LLM applications you're working on? is it the hallucinations or the old information? always down to discuss, especially since i'm still wrapping my head around the best ways to integrate these for a better learning workflow.

more on hyde's intuition soon.