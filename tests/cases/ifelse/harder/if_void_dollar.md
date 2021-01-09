# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

This should reduce into $(1)

## Input

`````js filename=intro
if (void $(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  $(1);
  let ifTestTmp = undefined;
  if (ifTestTmp) {
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
    x(8);
  }
}
`````

## Output

`````js filename=intro
$(1);
`````
