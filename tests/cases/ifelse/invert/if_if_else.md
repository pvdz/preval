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
  let ifTestTmp = $(1);
  if (ifTestTmp) {
  } else {
    {
      let ifTestTmp_1 = $(2);
      if (ifTestTmp_1) {
        $(3);
      } else {
        $(4);
      }
    }
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = $(1);
if (ifTestTmp) {
} else {
  let ifTestTmp_1 = $(2);
  if (ifTestTmp_1) {
    $(3);
  } else {
    $(4);
  }
}
`````

## Result

Should call `$` with:
[[1], [2], [4], null];

Normalized calls: Same

Final output calls: Same
