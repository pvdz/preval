# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Statement > Return > Auto ident c-opt simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return b?.["x"];
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
$(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return b?.[`x`];
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = `x`;
    const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
    tmpReturnArg = tmpChainElementObject;
    return tmpReturnArg;
  } else {
    return tmpReturnArg;
  }
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
