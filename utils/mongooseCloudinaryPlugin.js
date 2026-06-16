const cleanCloudinaryUrl = (val) => {
  if (typeof val === 'string') {
    if (val.includes('/uploads/http') || val.includes('uploads/http')) {
      return val.replace(/^\/?uploads\//, '');
    }
  }
  if (Array.isArray(val)) {
    return val.map(cleanCloudinaryUrl);
  }
  return val;
};

export const cloudinaryPlugin = (schema) => {
  schema.pre('save', function (next) {
    for (const path in schema.paths) {
      if (schema.paths[path].instance === 'String') {
        if (this[path] !== undefined && this[path] !== null) {
          this[path] = cleanCloudinaryUrl(this[path]);
        }
      } else if (schema.paths[path].instance === 'Array' && schema.paths[path].caster && schema.paths[path].caster.instance === 'String') {
        if (this[path] !== undefined && this[path] !== null) {
          this[path] = cleanCloudinaryUrl(this[path]);
        }
      }
    }
    next();
  });

  schema.pre('insertMany', function (next, docs) {
    if (Array.isArray(docs)) {
      docs.forEach((doc) => {
        for (const path in schema.paths) {
          if (schema.paths[path].instance === 'String') {
            if (doc[path] !== undefined && doc[path] !== null) {
              doc[path] = cleanCloudinaryUrl(doc[path]);
            }
          } else if (schema.paths[path].instance === 'Array' && schema.paths[path].caster && schema.paths[path].caster.instance === 'String') {
            if (doc[path] !== undefined && doc[path] !== null) {
              doc[path] = cleanCloudinaryUrl(doc[path]);
            }
          }
        }
      });
    }
    next();
  });
};
