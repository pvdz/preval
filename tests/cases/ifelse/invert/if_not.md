# Preval test case

# if_not.md

> ifelse > invert > if_not
>
> Invert the logic

## Input

`````js filename=intro
if (!$(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = $(1);
  if (ifTestTmp) {
  } else {
    $(2);
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = x(8);
  if (x) {
  } else {
    x(8);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = $(1);
if (ifTestTmp) {
} else {
  $(2);
}
`````
