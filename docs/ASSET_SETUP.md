# Asset Setup Instructions

## 🎯 **Current Status**

The application is now using placeholder SVG files for the ink types and logo. These are working and should display properly in the browser.

## 📁 **Asset Locations**

### **Ink Type Icons**

Place your PNG files in: `public/images/ink-types/`

- `amber.png`
- `amethyst.png`
- `emerald.png`
- `ruby.png`
- `sapphire.png`
- `steel.png`

### **Logo**

Place your logo PNG file in: `public/images/`

- `lorcana-logo.png`

## 🔄 **How to Replace Placeholders with Your Assets**

### **Option 1: Direct File Replacement**

1. **Backup the SVG files** (optional):

   ```bash
   cp public/images/ink-types/*.svg public/images/ink-types/backup/
   ```

2. **Replace with your PNG files**:

   - Copy your PNG files to the `public/images/ink-types/` directory
   - Make sure they have the exact names listed above
   - Replace `lorcana-logo.svg` with your `lorcana-logo.png`

3. **Update the code** (if needed):
   - If you want to use PNG instead of SVG, update the paths in:
     - `src/shared/constants/inkTypes.ts`
     - `src/routes/Builder.tsx`

### **Option 2: Keep Both Formats**

1. **Keep the SVG files** as fallbacks
2. **Add your PNG files** alongside them
3. **Update the code** to prefer PNG but fallback to SVG:

```typescript
// In src/shared/constants/inkTypes.ts
export const INK_TYPE_IMAGE_PATHS: Record<InkType, string> = {
  [INK_TYPES.AMBER]: "/images/ink-types/amber.png",
  // ... other PNG paths
};

// Add fallback paths
export const INK_TYPE_FALLBACK_PATHS: Record<InkType, string> = {
  [INK_TYPES.AMBER]: "/images/ink-types/amber.svg",
  // ... other SVG paths
};
```

## ✅ **Verification Steps**

1. **Check the browser console** for any 404 errors
2. **Verify ink type icons** are displaying in the filter section
3. **Verify the logo** is displaying in the top-left corner
4. **Test hover effects** on the ink type icons

## 🎨 **Asset Requirements**

### **Ink Type Icons**

- **Format**: PNG (recommended) or SVG
- **Size**: 32x32 pixels minimum (will scale up)
- **Background**: Transparent or matching the UI
- **Style**: Should match the hexagonal design theme

### **Logo**

- **Format**: PNG (recommended) or SVG
- **Size**: 200x80 pixels recommended
- **Background**: Transparent or matching the UI
- **Style**: Should match the Disney Lorcana branding

## 🚀 **Quick Test**

After placing your assets:

1. **Refresh the browser** (Ctrl+F5 or Cmd+Shift+R)
2. **Check the Network tab** in browser dev tools
3. **Verify no 404 errors** for image files
4. **Test the application** functionality

## 🔧 **Troubleshooting**

### **Images Not Loading**

- Check file paths are correct
- Verify file names match exactly (case-sensitive)
- Check browser console for 404 errors
- Ensure files are in the correct directory

### **Wrong Sizes**

- Update the `size` prop in the InkIcon component
- Adjust CSS styles in the Builder component for the logo

### **Performance Issues**

- Optimize PNG files (compress them)
- Consider using WebP format for better performance
- Use appropriate image sizes (don't use 1000x1000 for 32x32 icons)

## 📝 **Next Steps**

Once your assets are properly loaded:

1. **Test all functionality** - search, filters, deck building
2. **Verify responsive design** - test on mobile and tablet
3. **Check performance** - ensure fast loading times
4. **Update documentation** - remove placeholder references

Your detailed PNG assets should now display with full quality and detail!
