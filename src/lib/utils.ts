export function getHumanFileType(fileType: string) {
    switch (fileType) {
        case 'image/jpeg':
            return 'JPEG';
        case 'image/png':
            return 'PNG';
        case 'image/webp':
            return 'WEBP';
        case 'image/gif':
            return 'GIF';
        default:
            return fileType;
    }
}