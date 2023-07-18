# Preval test case

# if_func.md

> Ifelse > Simple > If func
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (function(){}) $();
`````

## Pre Normal

`````js filename=intro
if (
  function () {
    debugger;
  }
)
  $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = function () {
  debugger;
  return undefined;
};
if (tmpIfTest) {
  $();
} else {
}
`````

## Output

`````js filename=intro
$();
`````

## PST Output

With rename=true

`````js filename=intro
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
