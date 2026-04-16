# How to run/start your web application and web service. 
(If there are extra remarks, bugs, or exceptions, please state clearly in the readme file.)

===========================================================================================
If you have NO "Live Server" extension, please DOWNLOAD it before starting these processes!
===========================================================================================

1. After you open the folder "sec3_gr7_src", you need to open a terminal and change the 
directory in the terminal into the folder "sec3_gr7_ws_src" by typing "cd sec3_gr7_ws_src".

2. Type "npm start" in the terminal.

    If you get this message after running "npm start,"
    ===============================================================
    'nodemon' is not recognized as an internal or external command.
    operable program or batch file.
    ===============================================================
    Please TRY using the command "npm install nodemon --save-dev" in the terminal.
    and then try "npm start" again.

3. Go to the subfolder "Hompage" in the "sec3_gr7_fe_src", then open "homepage.html."

4. Right-click on the "homepage.html", then click "Open with Live Server"

* This website doesn't support for "&" because it can make the program consider it as a 
parameter instead.

# Limitation of Insertion & Updating
Product Managemnet:
    > Length Limitation
        - ProductID < 5 characters
        - Product name < 100 characters
        - Description < 1500 characters
        - Image link < 200 characters
        - Overall < 750 characters 
    =======================================================    
    ** Image Link must come from Google Drive's sharing. 
       Anyone who has the link can ONLY VIEW it!
    =======================================================
    > Others
        - Color: Available for picking more than 1 color
        - Size: Unavaliable for more than 1 size

User Managemnet:
    > Length Limitation
        - Employee ID < 7 characters ([A-Z][a-z]{2}[0-9]{4})
        - Firstname < 100 characters
        - Contact = 11 characters (xxx-xxxxxxx)
        - Email < 100 characters (with an email pattern)
        - Image link < 200 characters
        - Overall < 750 characters
        - Username < 107 characters
        - Password < 5o characters
    ==============================================================
    *** EMPLOYEE ID and USERNAME cannot be changed after insertion.
    ==============================================================
    > Others
        - When updating the employee information, it requires
        Input the correct employee ID and username; otherwise, 
        the updating will be NOT successful.