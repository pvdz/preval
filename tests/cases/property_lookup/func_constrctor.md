# Preval test case

# func_constrctor.md

> Property lookup > Func constrctor
>
> Getting the constructor from a known function, whatever it is, should yield `Function`

#TODO

## Input

`````js filename=intro
const x = [].flat;
const f = x.constructor;
$(f);
`````

## Pre Normal

`````js filename=intro
const x = [].flat;
const f = x.constructor;
$(f);
`````

## Normalized

`````js filename=intro
const tmpCompObj = [];
const x = tmpCompObj.flat;
const f = x.constructor;
$(f);
`````

## Output

`````js filename=intro
$(Function);
`````

## Globals

BAD@! Found 1 implicit global bindings:

Function

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
