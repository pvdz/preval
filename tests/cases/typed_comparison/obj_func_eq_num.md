# Preval test case

# obj_func_eq_num.md

> Typed comparison > Obj func eq num
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = function(){};
const y = x === false;
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = function () {
  debugger;
};
const y = x === false;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const x = function () {
  debugger;
  return undefined;
};
const y = x === false;
$(`out:`, y);
`````

## Output


`````js filename=intro
$(`out:`, false);
`````

## PST Output

With rename=true

`````js filename=intro
$( "out:", false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
