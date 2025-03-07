# Preval test case

# member_opt_expr_call_complex_arg.md

> Expr order > Member opt expr call complex arg
>
> Spread should normalize itself

This should throw. There was a regression where `x.y` was read before `a.b` (but the evaluation order ought to read `a.b` first)

## Input

`````js filename=intro
var a, x;
a?.b(x.y);
$(a, x);
`````

## Settled


`````js filename=intro
$(undefined, undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let x = undefined;
a?.b(x.y);
$(a, x);
`````

## Normalized


`````js filename=intro
let a = undefined;
let x = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpCalleeParam = tmpChainElementObject;
  const tmpCalleeParam$1 = tmpChainRootProp;
  const tmpCalleeParam$3 = x.y;
  const tmpChainElementCall = $dotCall(tmpCalleeParam, tmpCalleeParam$1, `b`, tmpCalleeParam$3);
} else {
}
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
