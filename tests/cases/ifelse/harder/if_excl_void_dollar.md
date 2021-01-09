# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

This should decompose into calling $(1) and $(2)

## Input

`````js filename=intro
if (!void $(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  $(1);
  let ifTestTmp = undefined;
  if (ifTestTmp) {
  } else {
    $(2);
  }
}
`````

## Uniformed

`````js filename=intro
{
  x(8);
  var x = x;
  if (x) {
  } else {
    x(8);
  }
}
`````

## Output

`````js filename=intro
$(1);
$(2);
`````
