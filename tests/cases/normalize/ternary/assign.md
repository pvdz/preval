# Preval test case

# assign.md

> normalize > ternary > assign
>
> If an assignment is a statement then a ternary should become an if-else

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
a = b ? c : d;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
if (b) {
  a = c;
} else {
  a = d;
}
$(a);
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = 8;
var x = 8;
var x = 8;
if (x) {
  x = x;
} else {
  x = x;
}
x(x);
`````

## Output

`````js filename=intro
let a = 1;
a = 3;
$(a);
`````
