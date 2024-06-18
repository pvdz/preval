# Preval test case

# func_constrctor.md

> Property lookup > Func constrctor
>
> Getting the constructor from a known function, whatever it is, should yield `Function`

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

## PST Output

With rename=true

`````js filename=intro
$( Function );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
