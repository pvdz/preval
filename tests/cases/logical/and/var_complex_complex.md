# Preval test case

# complex_complex.md

> logical > and > complex_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) && $(2);
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
  x = $(2);
}
`````

## Uniformed

`````js filename=intro
var x = x(8);
if (x) {
  x = x(8);
}
`````

## Output

`````js filename=intro
let x = $(1);
if (x) {
  x = $(2);
}
`````
