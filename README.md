## Capstone Team2 
---
Details of clone project:

* [Project Link](https://github.com/aashishshrestha5532/ecommersesample)
* Tech Stack:
  1. HTML5
  2. CSS3
  3. JavaScript
  4. React JS
---
### e-Commerce Project
#### Team Members
* [Jatin Gharat](https://gitlab.com/jatin_gharat)
* [Rakshit Sarkheliya](https://gitlab.com/sarkheliyarakshit)
* [Vijay Yarramsetty](https://gitlab.com/vijaykumaryv94)
#### Context of the Project:
* This Project is about building a backend for an existing React JS based frontend ready e-commerce application.

### Requirements

* python version > 3.0.0
* A stable internet connection and an up-to-date browser.
* PostgreSQL server installed in local machine.
* Install additional javascript modules by running the following command in terminal `npm install`.
* Additional python packages required for this project are listed in *requirements.txt*.
* Create a new virtual environment using the command: `python -m virtualenv my_env`.
* Download and install the additional packages by using the command: `pip3 install -r requirements.txt`.
---

### Working


1. To run this application, first clone this repository.

2. Download the dataset from the link above.

3. Create a virtual environment, activate it, and install the required packages.

4. Create Role and Database in PostgreSQL using the command: `psql -f SQL_SCRIPTS/CREATE_ROLE_N_DB.sql`.

5. To run frontend, cd to front directory and use the following command: `npm start`.

6. To test backend, Change directory to `ecommerce` directory using the following command: `cd ../ecommerce`.

7. Apply database migrations using the following command: `python manage.py migrate`.

8. Create admin user using the following command: `python manage.py createsuperuser`. Enter the username, email address, and password of your choice.

9.  Start the Django development server by executing the following command in the terminal: `python manage.py runserver`.

10. Then it will start an HTTP Server at the localhost address **http://127.0.0.1:8000**.

11. Open this address in any modern browser and choose values to view any plot.

12. To view the admin panel, use the credentials provided in the credentials section.

13. To stop the server, press `Ctrl + C`.

14. To Delete the Role and Database in PostgreSQL, use the command: `psql -f SQL_SCRIPTS/DELETE_ROLE_N_DB.sql`.

---
