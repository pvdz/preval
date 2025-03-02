# Preval test case

# member_expr_call_complex_arg_null.md

> Expr order > Member expr call complex arg null
>
> calling method with property arg should resolve in correct order (and throw when obj is null)

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

## Input

`````js filename=intro
var a = null, x = null;
a.b(x.y);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let x = undefined;
(a = null), (x = null);
a.b(x.y);
`````

## Normalized


`````js filename=intro
let a = undefined;
let x = undefined;
a = null;
x = null;
const tmpCallObj = a;
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = x.y;
$dotCall(tmpCallVal, tmpCallObj, `b`, tmpCalleeParam);
`````

## Output


`````js filename=intro
null.b;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
null.b;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
