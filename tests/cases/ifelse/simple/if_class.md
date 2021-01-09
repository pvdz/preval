# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (class{}) $();
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = class {};
  if (ifTestTmp) {
    $();
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = class {};
  if (x) {
    x();
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = class {};
if (ifTestTmp) {
  $();
}
`````
