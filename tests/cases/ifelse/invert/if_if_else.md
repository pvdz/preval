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

## Uniformed

`````js filename=intro
{
  var x = x(8);
  if (x) {
  } else {
    {
      var x = x(8);
      if (x) {
        x(8);
      } else {
        x(8);
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
