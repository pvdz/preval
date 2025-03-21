# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident c-opt simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw b?.["x"];
$(a);
`````

## Settled


`````js filename=intro
throw 1;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw 1;
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
throw b?.[`x`];
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `x`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpThrowArg = tmpChainElementObject;
} else {
}
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
throw 1;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
