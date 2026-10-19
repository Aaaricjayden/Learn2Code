// Learn2Code starter flashcards
// Each card contains: language, difficulty, question, answer, code example.

const rawCards = [
    // ==================== C: EASY ====================
    ["C", "Easy", "What is C?", "C is a procedural programming language often used for operating systems, embedded systems, and other low-level programming tasks.", "#include <stdio.h>"],
    ["C", "Easy", "What is a variable?", "A variable is a named storage location that holds a value. Its data type determines what kind of value it can store.", "int age = 20;"],
    ["C", "Easy", "What are data types?", "Data types describe the kind of data a variable can hold, such as an integer, decimal number, or character.", "int age = 20;\nfloat price = 5.5;\nchar grade = 'A';"],
    ["C", "Easy", "What does printf() do?", "printf() displays formatted text or values in the console.", "printf(\"Hello, world!\");"],
    ["C", "Easy", "What does scanf() do?", "scanf() reads input from the user. The address operator & is commonly used to provide a variable's address.", "int age;\nscanf(\"%d\", &age);"],
    ["C", "Easy", "What is an if statement?", "An if statement executes a block of code when a specified condition is true.", "if (age >= 18) {\n    printf(\"Adult\");\n}"],
    ["C", "Easy", "What does return 0 mean in main()?", "In a typical C program, return 0 indicates that the program finished successfully.", "int main(void) {\n    return 0;\n}"],

    // ==================== C: MEDIUM ====================
    ["C", "Medium", "What is an array?", "An array stores multiple values of the same data type in consecutive elements. Indexing starts at 0.", "int marks[3] = {80, 90, 75};"],
    ["C", "Medium", "What is a function?", "A function is a reusable block of code that performs a task. It can accept parameters and return a value.", "int add(int a, int b) {\n    return a + b;\n}"],
    ["C", "Medium", "How are strings represented in C?", "A C string is an array of characters terminated by the null character '\\0'.", "char name[] = \"Jayden\";"],
    ["C", "Medium", "What is the difference between while and do-while?", "A while loop checks its condition before running. A do-while loop runs its body at least once before checking.", "while (x < 3) { x++; }\ndo { x++; } while (x < 3);"],
    ["C", "Medium", "What is a struct?", "A struct groups related members, potentially of different data types, under one user-defined type.", "struct Student {\n    int id;\n    char grade;\n};"],
    ["C", "Medium", "What is a header file?", "A header file provides declarations and other shared information that can be included in a C source file.", "#include <stdio.h>"],
    ["C", "Medium", "What is pass-by-value?", "C passes function arguments by value, meaning the function receives a copy. Changing that parameter does not directly change the original variable.", "void change(int x) {\n    x = 100;\n}"],

    // ==================== C: HARD ====================
    ["C", "Hard", "What is a pointer?", "A pointer stores the memory address of an object or function. The * operator is used to declare and dereference pointers.", "int x = 10;\nint *ptr = &x;\nprintf(\"%d\", *ptr);"],
    ["C", "Hard", "What is NULL in C?", "NULL is a null pointer constant used to represent a pointer that does not point to a valid object or function.", "int *ptr = NULL;"],
    ["C", "Hard", "What is dynamic memory allocation?", "It requests memory while a program is running. In C, malloc() can allocate memory, and free() releases allocated memory.", "int *p = malloc(sizeof *p);\nif (p != NULL) {\n    *p = 10;\n    free(p);\n}"],
    ["C", "Hard", "What is a memory leak?", "A memory leak occurs when dynamically allocated memory is no longer needed but is not released, causing memory to remain occupied.", "int *p = malloc(sizeof *p);\n/* Remember to call free(p). */"],
    ["C", "Hard", "What is pointer arithmetic?", "Pointer arithmetic moves a pointer between elements of the same array. Moving by one advances by the size of the pointed-to type.", "int a[] = {10, 20, 30};\nint *p = a;\np++;"],
    ["C", "Hard", "What is a dangling pointer?", "A dangling pointer refers to an object whose lifetime has ended or to memory that is no longer valid.", "free(p);\np = NULL;"],
    ["C", "Hard", "What is the difference between stack and heap memory?", "The stack commonly stores function-call data and local variables. The heap is used for dynamic allocation. Their exact implementation depends on the system.", "int local = 5;\nint *dynamic = malloc(sizeof *dynamic);"],

    // ==================== C++: EASY ====================
    ["C++", "Easy", "What is C++?", "C++ is a general-purpose programming language that supports procedural, object-oriented, and generic programming.", "#include <iostream>"],
    ["C++", "Easy", "How do you declare a variable?", "Declare a variable by specifying its type and name, then optionally assign an initial value.", "int age = 20;"],
    ["C++", "Easy", "What does cout do?", "std::cout sends output to the standard output stream, usually the console.", "std::cout << \"Hello!\";"],
    ["C++", "Easy", "What does cin do?", "std::cin reads input from the standard input stream, usually the keyboard.", "int age;\nstd::cin >> age;"],
    ["C++", "Easy", "How does an if statement work?", "An if statement runs its block when the condition evaluates to true.", "if (age >= 18) {\n    std::cout << \"Adult\";\n}"],
    ["C++", "Easy", "How does a for loop work?", "A for loop repeats a block of code while its condition remains true, commonly using a counter.", "for (int i = 0; i < 5; i++) {\n    std::cout << i;\n}"],
    ["C++", "Easy", "What is a function?", "A function is a reusable block of code that can receive parameters and return a result.", "int add(int a, int b) {\n    return a + b;\n}"],

    // ==================== C++: MEDIUM ====================
    ["C++", "Medium", "What is a class?", "A class is a user-defined type that groups data and functions together. It can be used to create objects.", "class Student {\npublic:\n    int age;\n};"],
    ["C++", "Medium", "What is an object?", "An object is an instance of a class, with its own state and access to the class's available operations.", "Student s;\ns.age = 20;"],
    ["C++", "Medium", "What is a constructor?", "A constructor is a special class member that runs when an object is initialized. It usually sets up the object's initial state.", "class Student {\npublic:\n    Student() {}\n};"],
    ["C++", "Medium", "What is a reference?", "A reference is another name for an existing object. It must be initialized when declared.", "int x = 10;\nint &ref = x;"],
    ["C++", "Medium", "What is a vector?", "std::vector is a dynamic-size sequence container from the standard library that can grow or shrink as needed.", "#include <vector>\nstd::vector<int> nums = {1, 2, 3};"],
    ["C++", "Medium", "What is function overloading?", "Function overloading allows multiple functions to share a name when their parameter lists differ.", "int add(int a, int b);\ndouble add(double a, double b);"],
    ["C++", "Medium", "What is encapsulation?", "Encapsulation groups data and operations together and controls access to internal details using access specifiers such as private and public.", "class Account {\nprivate:\n    double balance;\n};"],

    // ==================== C++: HARD ====================
    ["C++", "Hard", "What is inheritance?", "Inheritance allows a derived class to reuse and extend the accessible members of a base class.", "class Animal {};\nclass Dog : public Animal {};"],
    ["C++", "Hard", "What is polymorphism?", "Polymorphism lets the same interface represent different behaviours. In C++, this can include compile-time and runtime polymorphism.", "Animal* a = new Dog();\ndelete a; // Base needs a virtual destructor."],
    ["C++", "Hard", "What is a virtual function?", "A virtual function enables runtime dispatch through a base-class pointer or reference when a derived class overrides that function.", "class Animal {\npublic:\n    virtual void speak() {}\n    virtual ~Animal() = default;\n};"],
    ["C++", "Hard", "What is a smart pointer?", "A smart pointer manages an object's lifetime using ownership rules, helping prevent resource leaks. Common types include unique_ptr and shared_ptr.", "auto p = std::make_unique<int>(10);"],
    ["C++", "Hard", "What is RAII?", "Resource Acquisition Is Initialization ties resource ownership to object lifetime, so resources are released automatically when their owning objects are destroyed.", "std::vector<int> values;\n// Memory is managed automatically."],
    ["C++", "Hard", "What is a template?", "A template allows functions or classes to work with types or values supplied as parameters.", "template <typename T>\nT bigger(T a, T b) {\n    return a > b ? a : b;\n}"],
    ["C++", "Hard", "Why prefer smart pointers to raw new/delete?", "Smart pointers express ownership and release owned resources automatically. Raw new/delete requires careful manual lifetime management.", "auto p = std::make_unique<int>(42);\n// No manual delete needed."],

    // ==================== JAVA: EASY ====================
    ["Java", "Easy", "What is Java?", "Java is a high-level, class-based programming language. Java programs commonly run on the Java Virtual Machine (JVM).", "class Main {\n    public static void main(String[] args) {}\n}"],
    ["Java", "Easy", "How do you declare a variable?", "A variable declaration specifies a type and a name. You can also initialize it with a value.", "int age = 20;"],
    ["Java", "Easy", "What are primitive data types?", "Java has eight primitive types: byte, short, int, long, float, double, char, and boolean.", "int age = 20;\nboolean passed = true;"],
    ["Java", "Easy", "What does System.out.println() do?", "It prints a value to standard output and then moves to a new line.", "System.out.println(\"Hello!\");"],
    ["Java", "Easy", "What is an if statement?", "An if statement executes a block when its boolean condition is true.", "if (age >= 18) {\n    System.out.println(\"Adult\");\n}"],
    ["Java", "Easy", "How does a loop work?", "A loop repeats code while a condition holds or for a specified sequence of values.", "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}"],
    ["Java", "Easy", "What is a method?", "A method is a named block of code inside a class that performs a task and may return a value.", "static int add(int a, int b) {\n    return a + b;\n}"],

    // ==================== JAVA: MEDIUM ====================
    ["Java", "Medium", "What is a class?", "A class defines a type by describing its fields and methods. Objects can be created from the class.", "class Student {\n    int age;\n}"],
    ["Java", "Medium", "What is an object?", "An object is an instance of a class. It has state represented by fields and behaviour provided by methods.", "Student s = new Student();\ns.age = 20;"],
    ["Java", "Medium", "What is a constructor?", "A constructor initializes a new object. It has the same name as its class and does not declare a return type.", "class Student {\n    Student() {}\n}"],
    ["Java", "Medium", "What is an array?", "An array stores a fixed number of elements of one declared type. Its indexes start at zero.", "int[] marks = {80, 90, 75};"],
    ["Java", "Medium", "What does static mean?", "A static member belongs to the class rather than to a particular instance of that class.", "class Counter {\n    static int count = 0;\n}"],
    ["Java", "Medium", "What is method overloading?", "Method overloading allows methods to have the same name if their parameter lists differ. Return type alone is not enough.", "int add(int a, int b);\ndouble add(double a, double b);"],
    ["Java", "Medium", "What is encapsulation?", "Encapsulation hides internal state and controls access through methods or other public interfaces.", "class Account {\n    private double balance;\n}"],

    // ==================== JAVA: HARD ====================
    ["Java", "Hard", "What is inheritance?", "Inheritance allows a class to extend another class and inherit its accessible members.", "class Animal {}\nclass Dog extends Animal {}"],
    ["Java", "Hard", "What is an interface?", "An interface defines a contract that implementing classes agree to fulfil. It can declare abstract methods and may also have default or static methods.", "interface Flyable {\n    void fly();\n}"],
    ["Java", "Hard", "What is polymorphism?", "Polymorphism allows a superclass or interface reference to refer to different object types and invoke the appropriate overridden method at runtime.", "Animal a = new Dog();\na.speak();"],
    ["Java", "Hard", "How does exception handling work?", "try, catch, and finally help manage exceptional situations. A finally block normally runs whether or not an exception occurs.", "try {\n    int n = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Error\");\n}"],
    ["Java", "Hard", "What is the difference between == and equals()?", "For object references, == checks whether two references point to the same object. equals() checks logical equality when the class implements it appropriately.", "String a = new String(\"Hi\");\nString b = new String(\"Hi\");\na.equals(b); // true"],
    ["Java", "Hard", "What are generics?", "Generics allow classes, interfaces, and methods to use type parameters, providing stronger compile-time type checking.", "List<String> names = new ArrayList<>();"],
    ["Java", "Hard", "What is garbage collection?", "The JVM automatically reclaims memory used by objects that are no longer reachable. Developers cannot rely on it to release every external resource promptly.", "Student s = new Student();\ns = null; // Object may become eligible."]
];

window.STARTER_CARDS = rawCards.map((item, index) => ({
    id: `starter-${index + 1}`,
    language: item[0],
    difficulty: item[1],
    question: item[2],
    answer: item[3],
    code: item[4],
    starter: true
}));