# Preval test case

# member_expr_call_complex_arg_true.md

> Expr order > Member expr call complex arg true
>
> calling method with property arg should resolve in correct order

## Input

`````js filename=intro
var a = true, x = false;
a.b(x.y);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let x = undefined;
(a = true), (x = false);
a.b(x.y);
`````

## Normalized


`````js filename=intro
let a = undefined;
let x = undefined;
a = true;
x = false;
const tmpCallObj = a;
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = x.y;
$dotCall(tmpCallVal, tmpCallObj, `b`, tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCallVal /*:unknown*/ = true.b;
const tmpCalleeParam /*:unknown*/ = false.y;
$dotCall(tmpCallVal, true, `b`, tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = true.b;
const b = false.y;
$dotCall( a, true, "b", b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')
