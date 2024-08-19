export const createNewLayer = (width, height) => {
  if (typeof window !== 'undefined') {  // クライアントサイドでのみ実行
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    return { canvas, context };
  }
  return null;
};

