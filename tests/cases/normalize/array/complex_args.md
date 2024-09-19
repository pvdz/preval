# Preval test case

# complex_args.md

> Normalize > Array > Complex args
>
> An array with complex elements should be normalized to a temp var

## Input

`````js filename=intro
$([5 + 5, $(), Array.prototype.length]);
`````

## Pre Normal


`````js filename=intro
$([5 + 5, $(), Array.prototype.length]);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpArrElement = 10;
const tmpArrElement$1 = $();
const tmpCompObj = $ArrayPrototype;
const tmpArrElement$3 = tmpCompObj.length;
const tmpCalleeParam = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpArrElement$1 = $();
const tmpArrElement$3 = $ArrayPrototype.length;
const tmpCalleeParam /*:array*/ = [10, tmpArrElement$1, tmpArrElement$3];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = $ArrayPrototype.length;
const c = [ 10, a, b ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: [10, undefined, 0]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
