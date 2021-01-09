# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (void 1) $();
`````

## Normalized

`````js filename=intro
{
  1;
  let ifTestTmp = undefined;
  if (ifTestTmp) {
    $();
  }
}
`````

## Uniformed

`````js filename=intro
{
  8;
  var x = x;
  if (x) {
    x();
  }
}
`````

## Output

`````js filename=intro

`````
