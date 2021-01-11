# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a;
let b = {x: 1, y: 2}
for (a of b) $(a);
`````

## Normalized

`````js filename=intro
let a;
let b = { x: 1, y: 2 };
for (a of b) {
  $(a);
}
`````

## Uniformed

`````js filename=intro
var x;
var x = { x: 8, x: 8 };
for (x of x) {
  x(x);
}
`````

## Output

`````js filename=intro
let a;
let b = { x: 1, y: 2 };
for (a of b) {
  $(a);
}
`````
