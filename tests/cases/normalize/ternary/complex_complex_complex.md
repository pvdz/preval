# Preval test case

# complex_complex_complex.md

> normalize > ternary > complex_complex_complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? $(2) : $(3)
const b = $(0) ? $(4) : $(5)
$(a, b)
`````

## Normalized

`````js filename=intro
{
  let a;
  {
    let ifTestTmp = $(1);
    if (ifTestTmp) {
      a = $(2);
    } else {
      a = $(3);
    }
  }
}
{
  let b;
  {
    let ifTestTmp_1 = $(0);
    if (ifTestTmp_1) {
      b = $(4);
    } else {
      b = $(5);
    }
  }
}
$(a, b);
`````

## Uniformed

`````js filename=intro
{
  var x;
  {
    var x = x(8);
    if (x) {
      x = x(8);
    } else {
      x = x(8);
    }
  }
}
{
  var x;
  {
    var x = x(8);
    if (x) {
      x = x(8);
    } else {
      x = x(8);
    }
  }
}
x(x, x);
`````

## Output

`````js filename=intro
let a;
let ifTestTmp = $(1);
if (ifTestTmp) {
  a = $(2);
} else {
  a = $(3);
}
let b;
let ifTestTmp_1 = $(0);
if (ifTestTmp_1) {
  b = $(4);
} else {
  b = $(5);
}
$(a, b);
`````
