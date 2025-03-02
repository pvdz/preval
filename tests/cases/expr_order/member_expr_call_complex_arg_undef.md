# Preval test case

# member_expr_call_complex_arg_undef.md

> Expr order > Member expr call complex arg undef
>
> calling method with property arg should resolve in correct order (and throw when obj is undefined)

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

## Input

`````js filename=intro
var a, x;
a.b(x.y);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let x = undefined;
a.b(x.y);
`````

## Normalized


`````js filename=intro
let a = undefined;
let x = undefined;
const tmpCallObj = a;
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = x.y;
$dotCall(tmpCallVal, tmpCallObj, `b`, tmpCalleeParam);
`````

## Output


`````js filename=intro
undefined.b;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
undefined.b;
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
