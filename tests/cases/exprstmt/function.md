# Preval test case

# function.md

> Exprstmt > Function
>
> Unused functions without side-effects can be eliminated. Okay it's not an expression. You got me.

## Input

`````js filename=intro
function f() {
  $();
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $();
};
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $();
  return undefined;
};
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
