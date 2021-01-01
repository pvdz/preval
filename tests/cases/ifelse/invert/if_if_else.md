# Preval test case

# if-if-else.md

> ifelse > invert > if-if-else
>
> Test else-matching

The first `if` should not be paired with an `else` after the transformations.

## Input

`````js filename=intro
if (!$(1)) 
  if ($(2)) $(3);
  else $(4);
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp_1 = !$(1);
  if (ifTestTmp_1) {
    let ifTestTmp = $(2);
    if (ifTestTmp) {
      $(3);
    } else {
      $(4);
    }
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp_1 = !$(1);
if (ifTestTmp_1) {
  let ifTestTmp = $(2);
  if (ifTestTmp) {
    $(3);
  } else {
    $(4);
  }
}
`````
