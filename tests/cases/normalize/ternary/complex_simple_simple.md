# Preval test case

# complex_simple_simple.md

> normalize > ternary > complex_simple_simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? 2 : 3
const b = $(0) ? 4 : 5
$(a, b)
`````

## Normalized

`````js filename=intro
let a;
{
  let ifTestTmp = $(1);
  if (ifTestTmp) {
    a = 2;
  } else {
    a = 3;
  }
}
let b;
{
  let ifTestTmp$1 = $(0);
  if (ifTestTmp$1) {
    b = 4;
  } else {
    b = 5;
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
  a = 3;
}
let b;
let ifTestTmp$1 = $(0);
if (ifTestTmp$1) {
  b = 4;
} else {
  b = 5;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 0
 - 2: 2,5
 - 3: undefined

Normalized calls: Same

Final output calls: Same
