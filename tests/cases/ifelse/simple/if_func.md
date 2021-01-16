# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (function(){}) $();
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = function () {};
  if (ifTestTmp) {
    $();
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = function () {};
if (ifTestTmp) {
  $();
}
`````
