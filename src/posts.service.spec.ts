import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      const results = postsService.findMany();

      expect(results.length).toEqual(4);

      expect(results[0].text).toEqual(posts[0].text);
      expect(results[1].text).toEqual(posts[1].text);
      expect(results[2].text).toEqual(posts[2].text);
      expect(results[3].text).toEqual(posts[3].text);
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
      const results = postsService.findMany({ skip: 1, limit: 2 });

      expect(results.length).toEqual(2);
      expect(results[0].text).toEqual(posts[1].text);
      expect(results[1].text).toEqual(posts[2].text);
    });

    // реализуйте недостающие тест-кейсы
    it('should handle skip only correctly', () => {
      const results = postsService.findMany({ skip: 2 });

      expect(results.length).toEqual(2);
      expect(results[0].text).toEqual(posts[2].text);
      expect(results[1].text).toEqual(posts[3].text);
    });

    it('should handle limit only correctly', () => {
      const results = postsService.findMany({ limit: 1 });

      expect(results.length).toEqual(1);
      expect(results[0].text).toEqual(posts[0].text);
    });

    it('should handle limit greater than total posts', () => {
      const results = postsService.findMany({ limit: 10 });

      expect(results.length).toEqual(4);
    });

    it('should handle skip greater than total posts', () => {
      const results = postsService.findMany({ skip: 10 });

      expect(results.length).toEqual(0);
    });

    it('should handle negative skip value', () => {
      const results = postsService.findMany({ skip: -5 });

      expect(results.length).toEqual(4);
    });

    it('should handle negative limit value', () => {
      const results = postsService.findMany({ limit: -5 });

      expect(results.length).toEqual(0);
    });

    it('should handle both skip and limit exceeding total posts', () => {
      const results = postsService.findMany({ limit: 10, skip: 10 });

      expect(results.length).toEqual(0);
    });
  });
});