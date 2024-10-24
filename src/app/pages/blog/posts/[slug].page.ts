import {
  ContentRenderer,
  injectContent,
  MarkdownComponent,
} from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { map } from 'rxjs';


export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, NgFor, JsonPipe],
  template: `
    <ng-container *ngIf="post$ | async as post">
      <h1>{{ post.attributes.title }}</h1>
      <analog-markdown [content]="post.content"></analog-markdown>
    </ng-container>
  `,
})
export default class BlogPostComponent {
  @Input() slug: string = '';
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'blog',
  });
}