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

## Output

`````js filename=intro
let ifTestTmp = class {};
if (ifTestTmp) {
  $();
}
`````

## Result

Should call `$` with:
 - 0: 
 - 1: undefined

Normalized calls: Same

Final output calls: Same
