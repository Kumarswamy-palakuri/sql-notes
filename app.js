// SQL Course Notes Application JavaScript

// Course content data
const courseContent = [
    {
        "id": "introduction",
        "title": "Introduction to SQL",
        "number": 1,
        "content": "SQL (Structured Query Language) is a standard programming language designed for managing and manipulating relational databases. It allows you to create, read, update, and delete data from databases. SQL is declarative, meaning you specify what you want, not how to get it. It's widely used across different database management systems like MySQL, PostgreSQL, SQL Server, Oracle, and SQLite.\n\n### Basic SQL Syntax Rules:\n```sql\n-- Comments start with double dashes\n/* Multi-line comments \n   use slash-asterisk */\n \n-- SQL statements end with semicolon\nSELECT * FROM users;\n \n-- SQL is case-insensitive for keywords\nselect * from USERS;  -- Same as above\n \n-- Good practice: Use uppercase for keywords\nSELECT name FROM users WHERE age >18;\n```\n \n### Example Database Schema:\n```sql\n-- Sample database structure we'll use throughout\nCREATE DATABASE company_db;\nUSE company_db;\n \n-- We'll work with these tables:\n-- employees (id, name, email, salary, department_id, hire_date)\n-- departments (id, name, location)\n-- projects (id, name, budget, start_date, end_date)\n-- employee_projects (employee_id, project_id, role)\n```"
    },
    {
        "id": "basic-commands",
        "title": "Basic SQL Commands",
        "number": 2,
        "content": "SQL commands are categorized into different types: DDL (Data Definition Language), DML (Data Manipulation Language), DCL (Data Control Language), and TCL (Transaction Control Language). Understanding these categories helps you grasp the purpose and scope of each command.\n\n### DDL (Data Definition Language):\n```sql\n-- CREATE: Create database objects\nCREATE DATABASE my_company;\nCREATE TABLE employees (id INT, name VARCHAR(100));\n \n-- ALTER: Modify existing database objects\nALTER TABLE employees ADD COLUMN email VARCHAR(255);\nALTER TABLE employees MODIFY COLUMN name VARCHAR(150);\n \n-- DROP: Delete database objects\nDROP TABLE employees;\nDROP DATABASE my_company;\n \n-- TRUNCATE: Remove all data from table (structure remains)\nTRUNCATE TABLE employees;\n```\n\n### DML (Data Manipulation Language):\n```sql\n-- INSERT: Add new data\nINSERT INTO employees (name, email) VALUES ('John Doe', 'john@email.com');\n \n-- SELECT: Retrieve data\nSELECT * FROM employees;\n \n-- UPDATE: Modify existing data\nUPDATE employees SET email = 'john.doe@email.com' WHERE name = 'John Doe';\n \n-- DELETE: Remove data\nDELETE FROM employees WHERE name = 'John Doe';\n```"
    },
    {
        "id": "data-types",
        "title": "Data Types",
        "number": 3,
        "content": "SQL data types define the kind of data that can be stored in table columns. Choosing appropriate data types is crucial for database performance, storage efficiency, and data integrity.\n\n### Numeric Data Types:\n```sql\n-- Integer types\nCREATE TABLE numeric_examples (\n    tiny_num TINYINT,        -- -128 to 127\n    small_num SMALLINT,      -- -32,768 to 32,767\n    medium_num MEDIUMINT,    -- -8,388,608 to 8,388,607\n    regular_num INT,         -- -2,147,483,648 to 2,147,483,647\n    big_num BIGINT          -- Very large range\n);\n \n-- Decimal types\nCREATE TABLE decimal_examples (\n    price DECIMAL(10,2),     -- 10 digits total, 2 after decimal\n    percentage FLOAT,        -- Floating point\n    precise_calc DOUBLE      -- Double precision floating point\n);\n```\n \n### String Data Types:\n```sql\n-- Character types\nCREATE TABLE string_examples (\n    short_text CHAR(10),     -- Fixed length\n    variable_text VARCHAR(255), -- Variable length\n    long_text TEXT,          -- Large text\n    binary_data BLOB         -- Binary data\n);\n```"
    },
    {
        "id": "creating-tables",
        "title": "Creating and Managing Tables",
        "number": 4,
        "content": "Tables are the fundamental structure in relational databases where data is stored in rows and columns. Creating well-designed tables with appropriate constraints ensures data integrity and optimal performance.\n\n### Basic Table Creation:\n```sql\n-- Simple table creation\nCREATE TABLE employees (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE,\n    salary DECIMAL(10,2),\n    hire_date DATE DEFAULT (CURDATE())\n);\n \n-- Table with multiple constraints\nCREATE TABLE departments (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(50) NOT NULL UNIQUE,\n    location VARCHAR(100),\n    budget DECIMAL(15,2) CHECK (budget > 0),\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n```\n\n### Adding Constraints:\n```sql\n-- Add foreign key constraint\nALTER TABLE employees \nADD COLUMN department_id INT,\nADD CONSTRAINT fk_department \nFOREIGN KEY (department_id) REFERENCES departments(id);\n \n-- Add check constraint\nALTER TABLE employees \nADD CONSTRAINT chk_salary CHECK (salary >= 0);\n```"
    },
    {
        "id": "inserting-data",
        "title": "Inserting Data",
        "number": 5,
        "content": "Inserting data is one of the most fundamental operations in SQL. There are various methods to add data to tables, from single row insertions to bulk imports.\n\n### Basic INSERT Statements:\n```sql\n-- Insert single row with all columns\nINSERT INTO employees (name, email, salary, department_id) \nVALUES ('John Smith', 'john.smith@company.com', 50000, 1);\n \n-- Insert multiple rows\nINSERT INTO employees (name, email, salary, department_id) VALUES \n('Alice Johnson', 'alice@company.com', 55000, 2),\n('Bob Wilson', 'bob@company.com', 48000, 1),\n('Carol Davis', 'carol@company.com', 62000, 3);\n```\n\n### INSERT with SELECT:\n```sql\n-- Insert data from another table\nINSERT INTO employees_backup (name, email, salary)\nSELECT name, email, salary FROM employees WHERE salary > 50000;\n```"
    },
    {
        "id": "querying-data",
        "title": "Querying Data - SELECT",
        "number": 6,
        "content": "The SELECT statement is the most commonly used SQL command for retrieving data from databases. It offers tremendous flexibility in how you can fetch, filter, and present data.\n\n### Basic SELECT Syntax:\n```sql\n-- Select all columns\nSELECT * FROM employees;\n \n-- Select specific columns\nSELECT name, email, salary FROM employees;\n \n-- Select with aliases\nSELECT \n    name AS employee_name,\n    email AS contact_email,\n    salary AS annual_salary\nFROM employees;\n \n-- Select with calculations\nSELECT \n    name,\n    salary,\n    salary * 12 AS annual_salary,\n    salary / 12 AS monthly_salary\nFROM employees;\n```\n\n### SELECT with Functions:\n```sql\n-- String functions\nSELECT \n    UPPER(name) AS upper_name,\n    LOWER(email) AS lower_email,\n    CONCAT(name, ' - ', email) AS full_info\nFROM employees;\n```"
    },
    {
        "id": "filtering-data",
        "title": "Filtering Data - WHERE",
        "number": 7,
        "content": "The WHERE clause is essential for filtering data and retrieving only the records that meet specific conditions.\n\n### Basic WHERE Conditions:\n```sql\n-- Equality condition\nSELECT * FROM employees WHERE department_id = 1;\n \n-- Numeric comparisons\nSELECT * FROM employees WHERE salary > 50000;\nSELECT * FROM employees WHERE salary BETWEEN 40000 AND 60000;\n \n-- String comparisons\nSELECT * FROM employees WHERE name = 'John Smith';\n```\n\n### Pattern Matching with LIKE:\n```sql\n-- Wildcard patterns\nSELECT * FROM employees WHERE name LIKE 'John%';      -- Starts with 'John'\nSELECT * FROM employees WHERE name LIKE '%Smith';     -- Ends with 'Smith'\nSELECT * FROM employees WHERE name LIKE '%oh%';       -- Contains 'oh'\n```\n\n### Logical Operators:\n```sql\n-- AND operator\nSELECT * FROM employees \nWHERE salary > 50000 AND department_id = 1;\n \n-- OR operator\nSELECT * FROM employees \nWHERE salary > 70000 OR department_id = 1;\n```"
    },
    {
        "id": "sorting-data",
        "title": "Sorting Data - ORDER BY",
        "number": 8,
        "content": "The ORDER BY clause arranges query results in a specific sequence, making data more readable and meaningful.\n\n### Basic Sorting:\n```sql\n-- Sort by single column (ascending by default)\nSELECT * FROM employees ORDER BY name;\nSELECT * FROM employees ORDER BY name ASC;\n \n-- Sort in descending order\nSELECT * FROM employees ORDER BY salary DESC;\n \n-- Sort by multiple columns\nSELECT * FROM employees \nORDER BY department_id ASC, salary DESC;\n```\n\n### Sorting with Expressions:\n```sql\n-- Sort by calculated column\nSELECT name, salary, salary * 12 AS annual_salary\nFROM employees\nORDER BY salary * 12 DESC;\n \n-- Sort by string functions\nSELECT name, email FROM employees\nORDER BY LENGTH(name) DESC, name ASC;\n```"
    },
    {
        "id": "grouping-data",
        "title": "Grouping Data",
        "number": 9,
        "content": "The GROUP BY clause is fundamental for data aggregation and analysis. It groups rows with similar values and allows you to perform calculations on each group using aggregate functions.\n\n### Basic GROUP BY:\n```sql\n-- Count employees by department\nSELECT department_id, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department_id;\n \n-- Multiple aggregate functions\nSELECT \n    department_id,\n    COUNT(*) AS employee_count,\n    AVG(salary) AS avg_salary,\n    MAX(salary) AS max_salary,\n    MIN(salary) AS min_salary,\n    SUM(salary) AS total_salary\nFROM employees\nGROUP BY department_id;\n```\n\n### HAVING Clause:\n```sql\n-- Filter groups with HAVING\nSELECT \n    department_id,\n    COUNT(*) AS employee_count,\n    AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department_id\nHAVING COUNT(*) > 5 AND AVG(salary) > 50000;\n```"
    },
    {
        "id": "joins",
        "title": "Joins",
        "number": 10,
        "content": "Joins are the cornerstone of relational databases, allowing you to combine data from multiple tables based on related columns.\n\n### INNER JOIN:\n```sql\n-- Basic INNER JOIN\nSELECT \n    e.name,\n    e.email,\n    d.name AS department_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.id;\n \n-- Multiple table JOIN\nSELECT \n    e.name AS employee_name,\n    d.name AS department_name,\n    p.name AS project_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.id\nINNER JOIN employee_projects ep ON e.id = ep.employee_id\nINNER JOIN projects p ON ep.project_id = p.id;\n```\n\n### LEFT JOIN:\n```sql\n-- LEFT JOIN to include all employees\nSELECT \n    e.name,\n    e.email,\n    d.name AS department_name\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.id;\n```"
    },
    {
        "id": "subqueries",
        "title": "Subqueries",
        "number": 11,
        "content": "Subqueries (nested queries) are queries within other queries that provide powerful ways to solve complex problems.\n\n### Subqueries in WHERE Clause:\n```sql\n-- Find employees with above-average salary\nSELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);\n \n-- Find employees in IT department\nSELECT name, email\nFROM employees\nWHERE department_id = (\n    SELECT id FROM departments WHERE name = 'IT'\n);\n```\n\n### Correlated Subqueries:\n```sql\n-- Find employees earning more than their department average\nSELECT name, salary, department_id\nFROM employees e1\nWHERE salary > (\n    SELECT AVG(salary)\n    FROM employees e2\n    WHERE e2.department_id = e1.department_id\n);\n```\n\n### EXISTS:\n```sql\n-- Find departments that have employees\nSELECT name\nFROM departments d\nWHERE EXISTS (\n    SELECT 1\n    FROM employees e\n    WHERE e.department_id = d.id\n);\n```"
    },
    {
        "id": "functions",
        "title": "Functions",
        "number": 12,
        "content": "SQL functions are pre-built operations that perform calculations, manipulate data, or return information about the database.\n\n### String Functions:\n```sql\n-- Common string manipulations\nSELECT \n    name,\n    UPPER(name) AS upper_name,\n    LOWER(name) AS lower_name,\n    LENGTH(name) AS name_length,\n    CONCAT(name, ' - ', email) AS full_info,\n    SUBSTRING(name, 1, 3) AS first_three_chars\nFROM employees;\n```\n\n### Numeric Functions:\n```sql\n-- Mathematical operations\nSELECT \n    salary,\n    ROUND(salary / 12, 2) AS monthly_salary,\n    CEIL(salary / 1000) AS salary_in_thousands_rounded_up,\n    FLOOR(salary / 1000) AS salary_in_thousands_rounded_down,\n    ABS(salary - 50000) AS difference_from_50k\nFROM employees;\n```\n\n### Date Functions:\n```sql\n-- Date manipulations\nSELECT \n    name,\n    hire_date,\n    CURDATE() AS today,\n    DATEDIFF(CURDATE(), hire_date) AS days_employed,\n    DATE_ADD(hire_date, INTERVAL 1 YEAR) AS first_anniversary\nFROM employees;\n```"
    },
    {
        "id": "indexes",
        "title": "Indexes",
        "number": 13,
        "content": "Indexes are database objects that improve query performance by creating shortcuts to data, similar to an index in a book.\n\n### Creating Basic Indexes:\n```sql\n-- Create simple index on single column\nCREATE INDEX idx_employee_email ON employees(email);\nCREATE INDEX idx_employee_salary ON employees(salary);\n \n-- Create unique index\nCREATE UNIQUE INDEX idx_employee_email_unique ON employees(email);\n \n-- Create composite index (multiple columns)\nCREATE INDEX idx_dept_salary ON employees(department_id, salary);\n```\n\n### Index Management:\n```sql\n-- View existing indexes\nSHOW INDEXES FROM employees;\n \n-- Analyze index usage (MySQL)\nEXPLAIN SELECT * FROM employees WHERE email = 'john@company.com';\n \n-- Drop index\nDROP INDEX idx_employee_email ON employees;\n```"
    },
    {
        "id": "views",
        "title": "Views",
        "number": 14,
        "content": "Views are virtual tables created by storing SELECT queries. They don't store data themselves but provide a way to simplify complex queries.\n\n### Creating Basic Views:\n```sql\n-- Simple view for employee information\nCREATE VIEW employee_info AS\nSELECT \n    e.id,\n    e.name,\n    e.email,\n    e.salary,\n    d.name AS department_name,\n    d.location\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.id;\n```\n\n### Complex Views:\n```sql\n-- Department summary view\nCREATE VIEW department_summary AS\nSELECT \n    d.id,\n    d.name,\n    d.location,\n    COUNT(e.id) AS employee_count,\n    AVG(e.salary) AS avg_salary,\n    MIN(e.salary) AS min_salary,\n    MAX(e.salary) AS max_salary\nFROM departments d\nLEFT JOIN employees e ON d.id = e.department_id\nGROUP BY d.id, d.name, d.location;\n```\n\n### Using Views:\n```sql\n-- Query views like regular tables\nSELECT * FROM employee_info WHERE department_name = 'IT';\n```"
    },
    {
        "id": "stored-procedures",
        "title": "Stored Procedures",
        "number": 15,
        "content": "Stored procedures are precompiled SQL code blocks stored in the database that can accept parameters, contain logic flow, and be called repeatedly.\n\n### Basic Stored Procedure:\n```sql\n-- Simple procedure without parameters\nDELIMITER //\nCREATE PROCEDURE GetAllEmployees()\nBEGIN\n    SELECT * FROM employees ORDER BY name;\nEND //\nDELIMITER ;\n \n-- Call the procedure\nCALL GetAllEmployees();\n```\n\n### Procedures with Parameters:\n```sql\n-- Procedure with input parameters\nDELIMITER //\nCREATE PROCEDURE GetEmployeesByDepartment(IN dept_id INT)\nBEGIN\n    SELECT name, email, salary \n    FROM employees \n    WHERE department_id = dept_id\n    ORDER BY salary DESC;\nEND //\nDELIMITER ;\n \n-- Call with parameter\nCALL GetEmployeesByDepartment(1);\n```\n\n### Procedures with Control Flow:\n```sql\n-- Procedure with conditional logic\nDELIMITER //\nCREATE PROCEDURE GiveRaise(IN emp_id INT, IN raise_percent DECIMAL(5,2))\nBEGIN\n    DECLARE current_salary DECIMAL(10,2);\n    DECLARE new_salary DECIMAL(10,2);\n    \n    SELECT salary INTO current_salary \n    FROM employees \n    WHERE id = emp_id;\n    \n    IF current_salary IS NULL THEN\n        SELECT 'Employee not found' AS message;\n    ELSE\n        SET new_salary = current_salary * (1 + raise_percent / 100);\n        UPDATE employees \n        SET salary = new_salary \n        WHERE id = emp_id;\n    END IF;\nEND //\nDELIMITER ;\n```"
    },
    {
        "id": "triggers",
        "title": "Triggers",
        "number": 16,
        "content": "Triggers are special stored procedures that automatically execute (fire) in response to specific database events such as INSERT, UPDATE, or DELETE operations.\n\n### Basic Triggers:\n```sql\n-- BEFORE INSERT trigger\nDELIMITER //\nCREATE TRIGGER before_employee_insert\n    BEFORE INSERT ON employees\n    FOR EACH ROW\nBEGIN\n    -- Automatically set hire_date if not provided\n    IF NEW.hire_date IS NULL THEN\n        SET NEW.hire_date = CURDATE();\n    END IF;\n    \n    -- Validate email format\n    IF NEW.email NOT LIKE '%@%.%' THEN\n        SIGNAL SQLSTATE '45000' \n        SET MESSAGE_TEXT = 'Invalid email format';\n    END IF;\nEND //\nDELIMITER ;\n```\n\n### UPDATE Triggers:\n```sql\n-- BEFORE UPDATE trigger\nDELIMITER //\nCREATE TRIGGER before_employee_update\n    BEFORE UPDATE ON employees\n    FOR EACH ROW\nBEGIN\n    -- Prevent salary decrease by more than 20%\n    IF NEW.salary < OLD.salary * 0.8 THEN\n        SIGNAL SQLSTATE '45000' \n        SET MESSAGE_TEXT = 'Salary cannot be decreased by more than 20%';\n    END IF;\nEND //\nDELIMITER ;\n```\n\n### Audit Triggers:\n```sql\n-- Create audit log table\nCREATE TABLE employee_audit_log (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    employee_id INT,\n    action VARCHAR(10),\n    old_values TEXT,\n    new_values TEXT,\n    changed_by VARCHAR(100),\n    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n \n-- AFTER UPDATE trigger for audit\nDELIMITER //\nCREATE TRIGGER after_employee_update\n    AFTER UPDATE ON employees\n    FOR EACH ROW\nBEGIN\n    INSERT INTO employee_audit_log (\n        employee_id, \n        action, \n        old_values, \n        new_values, \n        changed_by, \n        changed_at\n    )\n    VALUES (\n        NEW.id,\n        'UPDATE',\n        CONCAT('salary:', OLD.salary),\n        CONCAT('salary:', NEW.salary),\n        USER(),\n        NOW()\n    );\nEND //\nDELIMITER ;\n```"
    },
    {
        "id": "transactions",
        "title": "Transactions",
        "number": 17,
        "content": "Transactions are sequences of database operations that are treated as a single logical unit of work. They ensure data consistency and integrity by following ACID properties.\n\n### Basic Transaction Control:\n```sql\n-- Basic transaction structure\nSTART TRANSACTION;  -- or BEGIN;\n \nINSERT INTO employees (name, email, salary, department_id)\nVALUES ('Transaction User', 'trans@company.com', 45000, 1);\n \nUPDATE departments SET budget = budget - 45000 WHERE id = 1;\n\nCOMMIT;  -- Make changes permanent\n```\n\n### Transaction with Rollback:\n```sql\n-- Transaction with rollback\nSTART TRANSACTION;\n \nINSERT INTO employees (name, email, salary, department_id)\nVALUES ('Test User', 'test@company.com', 50000, 1);\n \n-- Check condition\nIF (SELECT COUNT(*) FROM employees WHERE department_id = 1) > 10 THEN\n    ROLLBACK;  -- Undo all changes\nELSE\n    COMMIT;    -- Make changes permanent\nEND IF;\n```\n\n### Savepoints:\n```sql\n-- Using savepoints for partial rollbacks\nSTART TRANSACTION;\n \nINSERT INTO departments (name, location, budget)\nVALUES ('New Dept 1', 'Location 1', 100000);\n \nSAVEPOINT sp1;\n \nINSERT INTO departments (name, location, budget)\nVALUES ('New Dept 2', 'Location 2', 150000);\n \n-- Something goes wrong\nROLLBACK TO SAVEPOINT sp1;  -- Keep first insert\n\nCOMMIT;\n```\n\n### Isolation Levels:\n```sql\n-- Set isolation levels\nSET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;\nSET TRANSACTION ISOLATION LEVEL READ COMMITTED;\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\nSET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n```"
    },
    {
        "id": "advanced-topics",
        "title": "Advanced Topics",
        "number": 18,
        "content": "Advanced SQL topics cover sophisticated techniques and optimizations that are crucial for complex applications and large-scale databases.\n\n### Common Table Expressions (CTEs):\n```sql\n-- Basic CTE\nWITH department_stats AS (\n    SELECT \n        department_id,\n        COUNT(*) as employee_count,\n        AVG(salary) as avg_salary,\n        MAX(salary) as max_salary\n    FROM employees\n    GROUP BY department_id\n)\nSELECT \n    d.name,\n    ds.employee_count,\n    ds.avg_salary,\n    ds.max_salary\nFROM departments d\nJOIN department_stats ds ON d.id = ds.department_id;\n```\n\n### Recursive CTEs:\n```sql\n-- Recursive CTE for organizational hierarchy\nWITH RECURSIVE employee_hierarchy AS (\n    -- Base case: top-level managers\n    SELECT \n        id,\n        name,\n        manager_id,\n        0 as level\n    FROM employees\n    WHERE manager_id IS NULL\n    \n    UNION ALL\n    \n    -- Recursive case: subordinates\n    SELECT \n        e.id,\n        e.name,\n        e.manager_id,\n        eh.level + 1\n    FROM employees e\n    JOIN employee_hierarchy eh ON e.manager_id = eh.id\n)\nSELECT * FROM employee_hierarchy ORDER BY level;\n```\n\n### Window Functions:\n```sql\n-- Advanced window functions\nSELECT \n    name,\n    department_id,\n    salary,\n    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank,\n    LAG(salary) OVER (PARTITION BY department_id ORDER BY salary) as prev_salary,\n    SUM(salary) OVER (PARTITION BY department_id) as dept_total\nFROM employees;\n```\n\n### Performance Optimization:\n```sql\n-- Query optimization examples\nEXPLAIN SELECT \n    e.name, \n    d.name \nFROM employees e \nJOIN departments d ON e.department_id = d.id \nWHERE e.salary > 50000;\n \n-- Use EXISTS instead of IN\nSELECT * FROM employees e\nWHERE EXISTS (\n    SELECT 1 FROM departments d \n    WHERE d.id = e.department_id AND d.location = 'New York'\n);\n \n-- Avoid functions in WHERE clauses\nSELECT * FROM employees \nWHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01';\n```"
    },
    {
    "id": "sql-efficiency-tips",
    "title": "Efficient SQL Practices",
    "number": 19,
        "content": "Efficient SQL writing helps boost performance, especially for large-scale data processing. Here are a few performance tips and best practices to keep in mind:\n\n### Date Range Filtering:\n```sql\n-- More efficient\nSELECT * \nFROM employees \nWHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01';\n```\nThis approach avoids using functions like YEAR() on columns, which would prevent index usage.\n\n### Limiting Result Sets:\n```sql\n-- Use LIMIT for large result sets\nSELECT * \nFROM employees \nORDER BY salary DESC \nLIMIT 10;\n```\nThis ensures that the database fetches only a specific number of rows, reducing memory and processing time.\n\n### Batch Updates:\n```sql\n-- Batch operations for large updates\nUPDATE employees \nSET salary = salary * 1.1 \nWHERE id BETWEEN 1 AND 1000;\n-- Repeat for next batch: WHERE id BETWEEN 1001 AND 2000;\n```\nBatching large update operations helps avoid locking too many rows at once and keeps transaction logs manageable.\n\n### Conclusion:\nThis comprehensive SQL course covers everything from basic database concepts to advanced optimization techniques. Practice these concepts with real databases to solidify your understanding."
        //  Key takeaways include:\n\n1. Master the fundamentals : SELECT, INSERT, UPDATE, DELETE, and JOIN operations  \n2. Understand data integrity: Proper use of constraints, keys, and normalization  \n3. Learn advanced querying: Subqueries, window functions, and CTEs  \n4. Optimize performance: Proper indexing, query optimization, and efficient SQL patterns  \n5. Handle complex scenarios: Transactions, stored procedures, and triggers  \n6. Stay current: SQL standards evolve, so keep learning new features and best practices\n \nRemember: The best way to learn SQL is through hands-on practice. \nCreate your own databases, experiment with different queries, and gradually tackle \nmore complex problems as you build confidence and expertise.\n```sql\n-- Happy querying!\n"



}
];

// Application state
let currentTheme = 'light';
let sidebarOpen = false;
let searchTerm = '';
let allSectionsLoaded = false;

// DOM Elements
const elements = {
    themeToggle: null,
    menuToggle: null,
    sidebar: null,
    overlay: null,
    searchInput: null,
    searchClear: null,
    backToTop: null,
    navLinks: null,
    contentWrapper: null,
    mainContent: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    loadAllContent();
    initializeTheme();
    setupEventListeners();
    initializeSyntaxHighlighting();
    setupScrollSpy();
    
    // Set first section as active
    setTimeout(() => {
        updateActiveNavItem('introduction');
    }, 100);
});

// Initialize DOM elements
function initializeElements() {
    elements.themeToggle = document.getElementById('themeToggle');
    elements.menuToggle = document.getElementById('menuToggle');
    elements.sidebar = document.getElementById('sidebar');
    elements.overlay = document.getElementById('overlay');
    elements.searchInput = document.getElementById('searchInput');
    elements.searchClear = document.getElementById('searchClear');
    elements.backToTop = document.getElementById('backToTop');
    elements.contentWrapper = document.querySelector('.content-wrapper');
    elements.mainContent = document.getElementById('mainContent');
}

// Load all course content dynamically
function loadAllContent() {
    if (allSectionsLoaded) return;
    
    // Clear existing content
    elements.contentWrapper.innerHTML = '';
    
    // Add all sections from courseContent array
    courseContent.forEach(section => {
        const sectionElement = createSectionElement(section);
        elements.contentWrapper.appendChild(sectionElement);
    });
    
    // Add copy buttons and syntax highlighting
    setTimeout(() => {
        addCopyButtons();
        initializeSyntaxHighlighting();
        allSectionsLoaded = true;
    }, 100);
    
    // Refresh navigation links
    elements.navLinks = document.querySelectorAll('.nav-link');
}

// Create HTML element for a section
function createSectionElement(section) {
    const sectionDiv = document.createElement('section');
    sectionDiv.id = section.id;
    sectionDiv.className = 'content-section';
    
    const html = parseMarkdownToHTML(section.content);
    sectionDiv.innerHTML = `
        <h1>${section.title}</h1>
        <div class="section-content">
            ${html}
        </div>
    `;
    
    return sectionDiv;
}

// Simple markdown to HTML parser
function parseMarkdownToHTML(content) {
    let html = content;
    
    // Convert code blocks
    html = html.replace(/```sql\n([\s\S]*?)\n```/g, (match, code) => {
        return `<div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">${escapeHtml(code)}</code></pre>
        </div>`;
    });
    
    // Convert headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Convert paragraphs
    html = html.split('\n\n').map(paragraph => {
        if (paragraph.trim() && !paragraph.startsWith('<')) {
            return `<p>${paragraph.replace(/\n/g, ' ')}</p>`;
        }
        return paragraph;
    }).join('\n\n');
    
    return html;
}

// Escape HTML characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add copy buttons to code blocks
function addCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const codeBlock = this.nextElementSibling.querySelector('code');
            const text = codeBlock.textContent;
            
            // Use the Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopySuccess(this);
                }).catch(() => {
                    // Fallback method
                    fallbackCopyTextToClipboard(text, this);
                });
            } else {
                // Fallback method
                fallbackCopyTextToClipboard(text, this);
            }
        });
    });
}

// Show copy success feedback
function showCopySuccess(button) {
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
    }, 2000);
}

// Fallback copy method
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Initialize theme system
function initializeTheme() {
    // Try to load from localStorage first
    const savedTheme = localStorage.getItem('sqlCourseTheme');
    
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    applyTheme(currentTheme);
}

// Apply theme
function applyTheme(theme) {
    currentTheme = theme;
    
    // Set the data attribute on document root
    document.documentElement.setAttribute('data-color-scheme', theme);
    
    // Update theme toggle icon
    if (elements.themeToggle) {
        const themeIcon = elements.themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('sqlCourseTheme', theme);
    } catch (e) {
        console.warn('Could not save theme preference:', e);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Mobile menu toggle
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }

    // Overlay click
    if (elements.overlay) {
        elements.overlay.addEventListener('click', function() {
            closeSidebar();
        });
    }

    // Setup navigation after content is loaded
    setTimeout(setupNavigationListeners, 200);

    // Search functionality
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase().trim();
            performSearch();
            updateSearchClearButton();
        });
    }

    if (elements.searchClear) {
        elements.searchClear.addEventListener('click', function() {
            elements.searchInput.value = '';
            searchTerm = '';
            clearSearch();
            updateSearchClearButton();
            elements.searchInput.focus();
        });
    }

    // Back to top button
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Window scroll event
    window.addEventListener('scroll', function() {
        handleScroll();
    });

    // Window resize event
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });

    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarOpen) {
            closeSidebar();
        }
    });
}

// Setup navigation listeners after content is loaded
function setupNavigationListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Update active nav item immediately
                updateActiveNavItem(targetId);
                
                // Scroll to section with offset for header
                const headerHeight = 64;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                if (window.innerWidth <= 768) {
                    setTimeout(closeSidebar, 300);
                }
            }
        });
    });
}

// Toggle sidebar
function toggleSidebar() {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

// Open sidebar
function openSidebar() {
    sidebarOpen = true;
    if (elements.sidebar) {
        elements.sidebar.classList.add('open');
    }
    if (elements.overlay) {
        elements.overlay.classList.add('visible');
    }
    document.body.style.overflow = 'hidden';
}

// Close sidebar
function closeSidebar() {
    sidebarOpen = false;
    if (elements.sidebar) {
        elements.sidebar.classList.remove('open');
    }
    if (elements.overlay) {
        elements.overlay.classList.remove('visible');
    }
    document.body.style.overflow = '';
}

// Update active navigation item
function updateActiveNavItem(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeId) {
            link.classList.add('active');
        }
    });
}

// Perform search
function performSearch() {
    if (!searchTerm) {
        clearSearch();
        return;
    }

    const sections = document.querySelectorAll('.content-section');
    let hasVisibleSections = false;

    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const title = section.querySelector('h1').textContent.toLowerCase();
        
        if (content.includes(searchTerm) || title.includes(searchTerm)) {
            section.classList.remove('hidden');
            hasVisibleSections = true;
            
            // Highlight search terms
            highlightSearchTerms(section);
        } else {
            section.classList.add('hidden');
        }
    });

    // Update navigation
    updateNavigationForSearch(hasVisibleSections);
}

// Clear search
function clearSearch() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('hidden');
    });

    // Remove highlights
    removeHighlights();

    // Reset navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.parentElement.style.display = '';
    });
}

// Highlight search terms
function highlightSearchTerms(section) {
    if (!searchTerm) return;

    // Remove existing highlights first
    section.querySelectorAll('.highlight-search').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });

    // Create a tree walker to find all text nodes (except in code blocks)
    const walker = document.createTreeWalker(
        section,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip text nodes inside code elements
                const parent = node.parentElement;
                if (parent && (parent.tagName === 'CODE' || parent.tagName === 'PRE')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    // Highlight search terms in text nodes
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
        if (regex.test(text)) {
            const highlightedHTML = text.replace(regex, '<span class="highlight-search">$1</span>');
            const span = document.createElement('span');
            span.innerHTML = highlightedHTML;
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
}

// Escape regex special characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Remove highlights
function removeHighlights() {
    document.querySelectorAll('.highlight-search').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Update navigation for search
function updateNavigationForSearch(hasVisibleSections) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hasVisibleSections) {
        // Hide all nav items if no sections match
        navLinks.forEach(link => {
            link.parentElement.style.display = 'none';
        });
    } else {
        // Show/hide nav items based on visible sections
        navLinks.forEach(link => {
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section && !section.classList.contains('hidden')) {
                link.parentElement.style.display = '';
            } else {
                link.parentElement.style.display = 'none';
            }
        });
    }
}

// Update search clear button
function updateSearchClearButton() {
    if (!elements.searchClear) return;
    
    if (elements.searchInput && elements.searchInput.value) {
        elements.searchClear.classList.add('visible');
    } else {
        elements.searchClear.classList.remove('visible');
    }
}

// Handle scroll events
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Back to top button
    if (elements.backToTop) {
        if (scrollTop > 300) {
            elements.backToTop.classList.add('visible');
        } else {
            elements.backToTop.classList.remove('visible');
        }
    }

    // Update active nav item based on scroll position
    if (!searchTerm) {
        updateActiveNavOnScroll();
    }
}

// Setup scroll spy
function setupScrollSpy() {
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !searchTerm) {
                const sectionId = entry.target.id;
                updateActiveNavItem(sectionId);
            }
        });
    }, observerOptions);

    // Observe all sections once they're loaded
    setTimeout(() => {
        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    }, 500);
}

// Update active nav on scroll (fallback method)
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    const scrollTop = window.pageYOffset + 100;

    let activeSection = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            activeSection = section.id;
        }
    });
    
    if (activeSection) {
        updateActiveNavItem(activeSection);
    }
}

// Initialize syntax highlighting
function initializeSyntaxHighlighting() {
    // Configure highlight.js for SQL
    if (typeof hljs !== 'undefined') {
        hljs.configure({
            languages: ['sql']
        });
        
        // Highlight all code blocks
        setTimeout(() => {
            document.querySelectorAll('pre code').forEach(block => {
                if (!block.classList.contains('hljs')) {
                    hljs.highlightElement(block);
                }
            });
        }, 100);
    }
}

// Utility function to debounce function calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}