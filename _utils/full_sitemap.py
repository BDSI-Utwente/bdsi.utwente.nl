import os

def main(target_dir, base_url): 
    print(target_dir)
    print(base_url)

    # check if target dir exists
    if not os.path.exists(target_dir):
        print(f"Error: target dir '{target_dir}' does not exist")
        return

    # check if target dir is a directory
    if not os.path.isdir(target_dir):
        print(f"Error: target dir '{target_dir}' is not a directory")
        return

    # recursively find all .html files
    html_files = []
    for root, dirs, files in os.walk(target_dir):
        if base_url != "": 
            root = root.replace(target_dir, base_url)

        for file in files:
            if file.endswith(".html"):
                if file == "index.html":
                    html_files.append(root)
                else:
                    html_files.append(os.path.join(root, file.replace(".html", "")))
                    html_files.append(os.path.join(root, file))

    # write to sitemap.txt
    with open("sitemap.txt", "w") as f:
        f.writelines([file + "\n" for file in html_files])

if __name__ == "__main__":
    import sys
    target_dir = os.getcwd() if len(sys.argv) < 2 else sys.argv[1]
    base_url = "" if len(sys.argv) < 3 else sys.argv[2]
    main(target_dir, base_url)