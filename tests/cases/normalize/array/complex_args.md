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
const tmpCompObj = $Array_prototype;
const tmpArrElement$3 = tmpCompObj.length;
const tmpCalleeParam = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpArrElement$1 = $();
const tmpCalleeParam /*:array*/ = [10, tmpArrElement$1, 0];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = [ 10, a, 0 ];
$( b );
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
