import os
from PIL import Image

def convert_jpg_to_webp(input_folder, output_folder):
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith((".jpg", ".jpeg")):
            input_path = os.path.join(input_folder, filename)
            output_filename = os.path.splitext(filename)[0] + ".webp"
            output_path = os.path.join(output_folder, output_filename)

            try:
                with Image.open(input_path) as img:
                    img.save(output_path, "WEBP", quality=85)
                print(f"Converted: {filename} -> {output_filename}")
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

# Example usage
if __name__ == "__main__":
    input_folder = "Will-Services"   # replace with your JPG folder
    output_folder = "Will-Services"   # output folder for WEBP files
    convert_jpg_to_webp(input_folder, output_folder)

