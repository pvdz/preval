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
      let ifTestTmp$1 = $(2);
      if (ifTestTmp$1) {
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
  let ifTestTmp$1 = $(2);
  if (ifTestTmp$1) {
    $(3);
  } else {
    $(4);
  }
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
