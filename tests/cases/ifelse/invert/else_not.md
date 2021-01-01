# Preval test case

# else_not.md

> ifelse > invert > else_not
>
> Invert the logic

## Input

`````js filename=intro
if (!$(1)) $(2);
else $(3);
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = !$(1);
  if (ifTestTmp) {
    $(2);
  } else {
    $(3);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = !$(1);
if (ifTestTmp) {
  $(2);
} else {
  $(3);
}
`````
