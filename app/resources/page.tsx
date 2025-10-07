"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, Wrench, Link as LinkIcon, ExternalLink, Star } from "lucide-react";
import resourcesData from "@/data/developer-resources.json";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            Developer Resources
          </h1>
          <p className="text-muted-foreground text-lg">
            Curated tools, learning resources, code snippets, and references for modern developers
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="learning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="snippets">Snippets</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>

          {/* Learning Resources Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {resourcesData.learningResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          {resource.name}
                          <Badge variant="outline">{resource.category}</Badge>
                        </CardTitle>
                        <CardDescription>{resource.bestFor}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Pricing</span>
                      <span className="text-sm text-muted-foreground">{resource.pricing}</span>
                    </div>

                    {/* Topics */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Topics</h4>
                      <div className="flex flex-wrap gap-1">
                        {resource.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Levels */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Skill Level</h4>
                      <div className="flex flex-wrap gap-1">
                        {resource.level.map((level) => (
                          <Badge key={level} variant="outline" className="text-xs">
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Link */}
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      Visit Resource
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletters Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Newsletters</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {resourcesData.newsletters.map((newsletter) => (
                  <Card key={newsletter.name}>
                    <CardHeader>
                      <CardTitle className="text-base">{newsletter.name}</CardTitle>
                      <CardDescription>{newsletter.frequency}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {newsletter.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <a
                        href={newsletter.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        Subscribe
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-8">
            {Object.entries(resourcesData.toolsByCategory).map(([category, tools]) => (
              <div key={category} className="space-y-4">
                <h2 className="text-2xl font-bold capitalize">{category}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <Card key={tool.name} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">Pricing</span>
                          <span className="text-xs text-muted-foreground">{tool.pricing}</span>
                        </div>

                        {tool.alternatives && tool.alternatives.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-xs">Alternatives</h4>
                            <div className="flex flex-wrap gap-1">
                              {tool.alternatives.map((alt) => (
                                <Badge key={alt} variant="outline" className="text-xs">
                                  {alt}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          Visit
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Code Snippets Tab */}
          <TabsContent value="snippets" className="space-y-6">
            <div className="grid gap-6">
              {resourcesData.codeSnippets.map((snippet) => (
                <Card key={snippet.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <Code className="h-5 w-5" />
                          {snippet.title}
                        </CardTitle>
                        <CardDescription>{snippet.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{snippet.language}</Badge>
                        <Badge variant="secondary">{snippet.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Code */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Code</h4>
                      <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>

                    {/* Usage */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Usage</h4>
                      <pre className="text-xs bg-muted/50 p-3 rounded-lg">
                        <code>{snippet.usage}</code>
                      </pre>
                    </div>

                    {/* Use Case */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">Use Case:</span>
                      <span className="text-sm text-muted-foreground">{snippet.useCase}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* References Tab */}
          <TabsContent value="references" className="space-y-8">
            {/* API References */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <LinkIcon className="h-6 w-6" />
                API References
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {resourcesData.apiReferences.map((api) => (
                  <Card key={api.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{api.name}</CardTitle>
                          <CardDescription>{api.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{api.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {api.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <a
                        href={api.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        View Documentation
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cheat Sheets */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Cheat Sheets</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resourcesData.cheatSheets.map((sheet) => (
                  <Card key={sheet.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">{sheet.name}</CardTitle>
                      <CardDescription>{sheet.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Badge variant="outline">{sheet.category}</Badge>
                      <a
                        href={sheet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        View Cheat Sheet
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Community Resources */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Community</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resourcesData.communityResources.map((community) => (
                  <Card key={community.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">{community.name}</CardTitle>
                      <CardDescription>{community.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Badge variant="outline">{community.type}</Badge>
                      <a
                        href={community.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        Visit Community
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
