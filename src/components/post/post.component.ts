import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';

export interface Post {
  id: string;
  userName: string;
  userPhoto: string;
  location: string;
  timeAgo: string;
  postImage: string;
  likes: number;
  commentsCount: number | string;
  likedBy: string;
  likedByPhotos: string[];
  caption: string;
  hashtag: string;
  liked?: boolean;
  showComments?: boolean;
  comments?: string[];
  newComment?: string;
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit {

  posts: Post[] = [];
  notifications: any[] = [];

  newPostText: string = '';
  newPostImage: string | null = null;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    // جلب البوستات من localStorage أولاً
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      this.posts = JSON.parse(savedPosts);
    } else {
      // لو مفيش، جلب البوستات من الخدمة
      this.postsService.getPosts().subscribe((data: Post[]) => {
        this.posts = data.map(post => {
          const liked = localStorage.getItem(`liked-${post.id}`) === 'true';
          const likeCount = localStorage.getItem(`likeCount-${post.id}`);
          return {
            ...post,
            liked,
            likes: likeCount ? parseInt(likeCount, 10) : post.likes
          };
        });
      });
    }
  }

  ngAfterViewInit(): void {
    this.initializeImageUpload();
  }

  ////////// LIKE ACTION
  toggleLike(post: Post): void {
    if (!post.liked) {
      post.likes++;
      post.liked = true;
    } else {
      post.likes--;
      post.liked = false;
    }
    // حفظ اللايك في localStorage
    localStorage.setItem(`liked-${post.id}`, String(post.liked));
    localStorage.setItem(`likeCount-${post.id}`, post.likes.toString());
  }

  toggleComment(post: Post): void {
    post.showComments = !post.showComments;
  }

  addComment(post: Post): void {
    if (!post.newComment || post.newComment.trim() === '') return;

    if (!post.comments) post.comments = [];
    post.comments.push(post.newComment.trim());
    post.newComment = '';

    // تحديث localStorage بعد إضافة تعليق
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  ////////// إضافة بوست جديد
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newPostImage = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeImage(): void {
    this.newPostImage = null;
  }

  addNewPost(): void {
    if (!this.newPostText.trim() && !this.newPostImage) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userName: 'Current User',
      userPhoto: './imgs/profile_pic1.webp',
      location: 'Cairo',
      timeAgo: 'Just now',
      postImage: this.newPostImage || '',
      likes: 0,
      commentsCount: 0,
      likedBy: '',
      likedByPhotos: [],
      caption: this.newPostText,
      hashtag: '',
      liked: false,
      showComments: false,
      comments: []
    };

    // إضافة البوست الجديد في البداية
    this.posts.unshift(newPost);

    // حفظ البوستات في localStorage
    localStorage.setItem('posts', JSON.stringify(this.posts));

    // إعادة تعيين الحقول
    this.newPostText = '';
    this.newPostImage = null;
  }

  ////////// تهيئة رفع الصور للبوست الجديد
  private initializeImageUpload(): void {
    const uploadImage = document.getElementById("upload-image") as HTMLInputElement | null;
    const uploadBtn = document.querySelector(".upload-btn") as HTMLElement | null;
    const removeBtn = document.getElementById("remove-image") as HTMLElement | null;
    const imagePreview = document.getElementById("image-preview") as HTMLElement | null;
    const previewImg = document.getElementById("preview-img") as HTMLImageElement | null;

    if (uploadImage && uploadBtn && removeBtn && imagePreview && previewImg) {
      uploadImage.addEventListener("change", () => {
        const file = uploadImage.files ? uploadImage.files[0] : null;
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && previewImg) {
              previewImg.src = e.target.result as string;
              imagePreview.style.display = "block";
              removeBtn.style.display = "inline-block";
              uploadBtn.style.display = "none";
              this.newPostImage = previewImg.src;
            }
          };
          reader.readAsDataURL(file);
        }
      });

      removeBtn.addEventListener("click", () => {
        if (uploadImage && imagePreview && removeBtn && uploadBtn && previewImg) {
          uploadImage.value = "";
          imagePreview.style.display = "none";
          removeBtn.style.display = "none";
          uploadBtn.style.display = "inline-block";
          previewImg.src = "";
          this.newPostImage = null;
        }
      });
    }
  }

}
