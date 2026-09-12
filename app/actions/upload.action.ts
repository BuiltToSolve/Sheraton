'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function uploadDocument(data: FormData) {
  const file: File | null = data.get('file') as unknown as File;
  const bookingNumber = data.get('bookingNumber') as string || 'unknown';

  if (!file) {
    return { success: false, error: 'No file provided' };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'guests');
    
    // Ensure directory exists
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }

    const originalName = file.name;
    const ext = originalName.split('.').pop() || 'jpg';
    
    // Format: timestamp-bookingNumber-random.ext
    const filename = `${Date.now()}-${bookingNumber}-${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const path = join(uploadsDir, filename);

    await writeFile(path, buffer);
    
    return { success: true, path: `/uploads/guests/${filename}` };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'Failed to upload file' };
  }
}

import { readFile, unlink } from 'fs/promises';

export async function getDocumentAsBase64(urlPath: string) {
  try {
    // Validate that it's a valid path inside our uploads directory to prevent LFI
    if (!urlPath || !urlPath.startsWith('/uploads/guests/')) {
      return { success: false, error: 'Invalid document path' };
    }

    // Protect against directory traversal
    const normalizedPath = urlPath.replace(/\.\./g, '');
    
    // Construct absolute path
    const absolutePath = join(process.cwd(), 'public', normalizedPath);
    
    const fileBuffer = await readFile(absolutePath);
    const base64String = fileBuffer.toString('base64');
    
    const ext = normalizedPath.split('.').pop()?.toLowerCase();
    let mimeType = 'application/octet-stream';
    if (ext === 'pdf') mimeType = 'application/pdf';
    else if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
    else if (ext === 'png') mimeType = 'image/png';
    else if (ext === 'webp') mimeType = 'image/webp';
    
    return { success: true, data: `data:${mimeType};base64,${base64String}` };
  } catch (error) {
    console.error('Failed to read document:', error);
    return { success: false, error: 'Failed to read document' };
  }
}

export async function deleteDocument(urlPath: string) {
  try {
    if (!urlPath || !urlPath.startsWith('/uploads/guests/')) {
      return { success: false, error: 'Invalid document path' };
    }
    const normalizedPath = urlPath.replace(/\.\./g, '');
    const absolutePath = join(process.cwd(), 'public', normalizedPath);
    
    await unlink(absolutePath);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist anyway
      return { success: true };
    }
    console.error('Failed to delete document:', error);
    return { success: false, error: 'Failed to delete document' };
  }
}

