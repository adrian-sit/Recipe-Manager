CREATE DATABASE RecipeManager;

CREATE TABLE Ingredients(
    IngredientID INT PRIMARY KEY,
    IngredientName VARCHAR(255) NOT NULL
);

CREATE TABLE Steps(
    StepID INT PRIMARY KEY,
    StepNumber INT NOT NULL,
    StepDescription VARCHAR(255) NOT NULL,
    Tool VARCHAR(20),
    Time INT DEFAULT 0,
    IngredientID INT,
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID)
);

CREATE TABLE Recipes(
    RecipeID INT PRIMARY KEY,
    RecipeName VARCHAR(255) NOT NULL,
    RecipeDescription VARCHAR(255) NOT NULL,
    RecipeImage VARCHAR(255) NULL,
    RecipeType VARCHAR(255) NOT NULL,
    StepID INT NOT NULL,
    FOREIGN KEY (StepID) REFERENCES Steps(StepID)
);

CREATE TABLE Inventory(
    IngredientID INT,
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID)
);