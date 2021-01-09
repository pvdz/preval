# Preval test case

# simple_complex_simple.md

> normalize > ternary > simple_complex_simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = 1 ? $(2) : 3
const b = 0 ? $(4) : 5
$(a, b)
`````

## Normalized

`````js filename=intro
{
  let a;
  if (1) {
    a = $(2);
  } else {
    a = 3;
  }
}
{
  let b;
  if (0) {
    b = $(4);
  } else {
    b = 5;
  }
}
$(a, b);
`````

## Uniformed

`````js filename=intro
{
  var x;
  if (8) {
    x = x(8);
  } else {
    x = 8;
  }
}
{
  var x;
  if (8) {
    x = x(8);
  } else {
    x = 8;
  }
}
x(x, x);
`````

## Output

`````js filename=intro
let a;
a = $(2);
let b;
b = 5;
$(a, b);
`````
