Testing
=======
1. Chrome > chrome://extensions/ > Load unpacked > select the root of this folder
2. Navigate to an ADO page (e.g. https://dev.azure.com/advantive-devops/Advantive/_workitems/edit/788341)
3. Click the anchor and box buttons at the top left of the work item (to the right of the work item type and ticket number)
    a. Link icon will generate an HTML anchor to the ticket using the ID, title and link.
    b. Box icon will generate a branch name (as per company conventions) using the work item type, team name, work item ID and description.
        Branch name convention: advantiveadmin.sharepoint.com/:w:/r/sites/Development/_layouts/15/Doc.aspx?sourcedoc=%7BC3B98D90-BED1-44F2-8FDF-0825D53F30D4%7D&file=Repo%20and%20Branch%20Setup.docx
        e.g. https://dev.azure.com/advantive-devops/Advantive/_workitems/edit/788341 -> feature/commerce-vision-platform-788341-devops-powershell-build-fail