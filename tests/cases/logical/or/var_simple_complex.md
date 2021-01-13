# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 || $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
if (x) {
} else {
  x = $(2);
}
$(x);
`````

## Uniformed

`````js filename=intro
var x = 8;
if (x) {
} else {
  x = x(8);
}
x(x);
`````

## Output

`````js filename=intro
let x = 1;
if (x) {
} else {
  x = $(2);
}
$(x);
`````
