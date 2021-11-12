In your repository main folder, create an `info.json` file with the following information:

```json
{
    "author" : ["yourname (discord#identifer)"],
    "install_msg" : "Message the user will recieve when they agree to install your repository.",
    "name" : "Name of your repository.",
    "short" : "Shot description of your repository.",
    "description" : "Long description about your repository.",
    "tags" : ["List of search tags on the aometry portal for your repo."]
}
```

Each module should be in it's own separate folder in the repository, and each module should also have its own `info.json` file with the following information:

```json
{
    "author" : ["Author", "Co-Author (optional)", "Co-Author 2 (optional)"],
    "install_msg" : "A message you wish to display to users after they sucessfully install your module.",
    "name" : "Name of your module.",
    "short" : "A short description. Displayed in the `[p]module list` command.",
    "requirements" : ["Example library", "Example 2", "Example 3"],
    "description" : "Full description of your module. Displayed on the Aometry Module Portal and with `[p]module info`",
    "permissions" : ["List of Bot permissions required"],
    "tags" : ["List of search tags for the Aometry module portal"]
}
```