#!/usr/bin/env python3
import subprocess
import os
import sys

def compress_video(input_file, output_file):
    """
    Comprime un video usando ffmpeg con configuración optimizada para web
    """
    # Verificar si el archivo existe
    if not os.path.exists(input_file):
        print(f"Error: El archivo {input_file} no existe")
        return False
    
    # Tamaño original
    original_size = os.path.getsize(input_file) / (1024 * 1024)  # MB
    print(f"Tamaño original: {original_size:.2f} MB")
    
    # Comando ffmpeg para comprimir
    # -crf 28: calidad media-baja (más alto = menor calidad pero menor tamaño)
    # -preset fast: balance entre velocidad y compresión
    # -movflags +faststart: optimiza para streaming web
    cmd = [
        'ffmpeg',
        '-i', input_file,
        '-c:v', 'libx264',  # Codec H.264 (más compatible)
        '-crf', '28',       # Calidad (18-28 es bueno para web)
        '-preset', 'fast',  # Velocidad de compresión
        '-c:a', 'aac',      # Audio AAC
        '-b:a', '128k',     # Bitrate de audio
        '-movflags', '+faststart',  # Optimización para web
        '-y',  # Sobrescribir si existe
        output_file
    ]
    
    print("Comprimiendo video... esto puede tomar unos minutos...")
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            new_size = os.path.getsize(output_file) / (1024 * 1024)  # MB
            reduction = ((original_size - new_size) / original_size) * 100
            print(f"\n✅ Video comprimido exitosamente!")
            print(f"Nuevo tamaño: {new_size:.2f} MB")
            print(f"Reducción: {reduction:.1f}%")
            return True
        else:
            print(f"Error al comprimir: {result.stderr}")
            return False
    except FileNotFoundError:
        print("Error: ffmpeg no está instalado. Por favor, espera a que termine la instalación.")
        return False
    except Exception as e:
        print(f"Error inesperado: {e}")
        return False

if __name__ == "__main__":
    input_video = "public/luciano.mov"
    output_video = "public/luciano_compressed.mp4"
    
    if compress_video(input_video, output_video):
        print(f"\nAhora puedes actualizar el código para usar: /luciano_compressed.mp4")
    else:
        print("\nNo se pudo comprimir el video. Intenta de nuevo más tarde.")