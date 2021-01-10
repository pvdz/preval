# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) && 2;
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
  x = 2;
}
$(x);
`````

## Uniformed

`````js filename=intro
var x = x(8);
if (x) {
  x = 8;
}
x(x);
`````

## Output

`````js filename=intro
let x = $(1);
if (x) {
  x = 2;
}
$(x);
`````
