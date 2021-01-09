# Preval test case

# init_assign.md

> normalize > binding > init_assign
>
> Should normalize assignment init to separate line

#TODO

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b = c
`````

## Normalized

`````js filename=intro
let b = 10;
let c = 20;
b = c;
let a = c;
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = 8;
x = x;
var x = x;
`````

## Output

`````js filename=intro
let b = 10;
b = 20;
`````
