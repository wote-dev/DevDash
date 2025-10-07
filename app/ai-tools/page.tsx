"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Lightbulb, CheckCircle, Zap, ExternalLink, Star } from "lucide-react";
import aiData from "@/data/ai-coding-agents.json";

export default function AIToolsPage() {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <Bot className="h-10 w-10 text-primary" />
            AI Coding Tools
          </h1>
          <p className="text-muted-foreground text-lg">
            Your comprehensive guide to AI-powered development tools, prompts, and best practices
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="practices">Best Practices</TabsTrigger>
            <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
          </TabsList>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {aiData.agents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          {agent.name}
                          <Badge variant="outline">{agent.category}</Badge>
                        </CardTitle>
                        <CardDescription>{agent.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{agent.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Pricing */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Pricing</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(agent.pricing).map(([tier, price]) => (
                          <div key={tier} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{tier}:</span>
                            <span>{price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Best For</h4>
                      <div className="flex flex-wrap gap-1">
                        {agent.bestFor.map((use) => (
                          <Badge key={use} variant="secondary" className="text-xs">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Features</h4>
                      <ul className="text-sm space-y-1">
                        {agent.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Link */}
                    <a
                      href={agent.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      Visit Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prompts Tab */}
          <TabsContent value="prompts" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {aiData.promptLibrary.map((prompt) => (
                <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{prompt.title}</CardTitle>
                        <CardDescription>{prompt.category}</CardDescription>
                      </div>
                      <Badge variant="outline">
                        {prompt.effectiveness}/5.0
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Prompt */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Prompt Template</h4>
                      <pre className="text-xs bg-muted p-3 rounded-lg whitespace-pre-wrap font-mono">
                        {prompt.prompt}
                      </pre>
                    </div>

                    {/* Use Cases */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Use Cases</h4>
                      <div className="flex flex-wrap gap-1">
                        {prompt.useCases.map((useCase) => (
                          <Badge key={useCase} variant="secondary" className="text-xs">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Best Practices Tab */}
          <TabsContent value="practices" className="space-y-6">
            <div className="grid gap-6">
              {aiData.bestPractices.map((practice) => (
                <Card key={practice.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      {practice.title}
                    </CardTitle>
                    <CardDescription>{practice.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Tips */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tips</h4>
                      <ul className="space-y-2">
                        {practice.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Example */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Example</h4>
                      <div className="bg-muted p-3 rounded-lg text-sm italic">
                        {practice.example}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Comparisons Tab */}
          <TabsContent value="comparisons" className="space-y-6">
            <div className="grid gap-6">
              {aiData.comparisons.map((comparison, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      {comparison.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="text-base px-3 py-1">
                        Winner: {comparison.winner}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Why?</h4>
                      <p className="text-sm text-muted-foreground">{comparison.reasoning}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Alternatives</h4>
                      <div className="flex flex-wrap gap-2">
                        {comparison.alternatives.map((alt) => (
                          <Badge key={alt} variant="outline">
                            {alt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {aiData.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="mt-0.5">
                    {tip.category}
                  </Badge>
                  <span className="text-muted-foreground">{tip.tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
