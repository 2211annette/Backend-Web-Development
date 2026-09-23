/**
 * Repository boundary for post storage.
 *
 * The service layer depends only on these operations:
 * findAll, findById, create, update, and remove.
 *
 * If this repository is replaced with a Prisma-backed implementation,
 * the service and controller do not need to change. Only the storage
 * implementation inside this repository changes. Business validation,
 * allowed fields, response shapes, and HTTP behavior remain outside
 * the repository.
 */

// Map is the current storage implementation.
// Replacing this with Prisma later will not affect the service.
const posts = new Map([
  [
    1,
    {
      id: 1,
      title: 'First post',
      body: 'Repository boundaries protect change.',
      authorId: 7,
    },
  ],
  [
    2,
    {
      id: 2,
      title: 'Second post',
      body: 'Services should speak in domain language.',
      authorId: 8,
    },
  ],
]);

let nextId = 3;

function findAll() {
  return Array.from(posts.values());
}

function findById(id) {
  return posts.get(Number(id)) || null;
}

function create(fields) {
  const id = nextId++;

  const post = {
    id,
    ...fields,
  };

  posts.set(id, post);

  return post;
}

function update(id, patch) {
  const numericId = Number(id);
  const post = posts.get(numericId);

  if (!post) return null;

  const updatedPost = {
    ...post,
    ...patch,
  };

  posts.set(numericId, updatedPost);

  return updatedPost;
}

function remove(id) {
  const numericId = Number(id);

  return posts.delete(numericId);
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};