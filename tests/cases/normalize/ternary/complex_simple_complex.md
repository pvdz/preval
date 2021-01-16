# Preval test case

# complex_simple_complex.md

> normalize > ternary > complex_simple_complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? 2 : $(3)
const b = $(0) ? 4 : $(5)
$(a, b)
`````

## Normalized

`````js filename=intro
{
  let a;
  {
    let ifTestTmp = $(1);
    if (ifTestTmp) {
      a = 2;
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
      b = 4;
    } else {
      b = $(5);
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let a;
let ifTestTmp = $(1);
if (ifTestTmp) {
  a = 2;
} else {
  a = $(3);
}
let b;
let ifTestTmp_1 = $(0);
if (ifTestTmp_1) {
  b = 4;
} else {
  b = $(5);
}
$(a, b);
`````
