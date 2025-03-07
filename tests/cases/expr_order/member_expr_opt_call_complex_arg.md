# Preval test case

# member_expr_opt_call_complex_arg.md

> Expr order > Member expr opt call complex arg
>
> Spread should normalize itself

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

## Input

`````js filename=intro
var a, x;
a.b?.(x.y);
`````

## Settled


`````js filename=intro
undefined.b;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.b;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let x = undefined;
a.b?.(x.y);
`````

## Normalized


`````js filename=intro
let a = undefined;
let x = undefined;
const tmpChainRootProp = a;
const tmpChainElementObject = tmpChainRootProp.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpCalleeParam = tmpChainElementObject;
  const tmpCalleeParam$1 = tmpChainRootProp;
  const tmpCalleeParam$3 = x.y;
  const tmpChainElementCall = $dotCall(tmpCalleeParam, tmpCalleeParam$1, `b`, tmpCalleeParam$3);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
undefined.b;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
