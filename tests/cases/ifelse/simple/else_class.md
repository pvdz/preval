# Preval test case

# else_obj.md

> ifelse > simple > else_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (class{}) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = class {};
  if (ifTestTmp) {
    $(1);
  } else {
    $(2);
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = class {};
  if (x) {
    x(8);
  } else {
    x(8);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = class {};
if (ifTestTmp) {
  $(1);
} else {
  $(2);
}
`````
