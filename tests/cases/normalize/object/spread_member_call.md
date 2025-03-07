# Preval test case

# spread_member_call.md

> Normalize > Object > Spread member call
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
const obj = {foo() { return $({ x: 1 }); }};
$({...obj.foo()});
`````

## Settled


`````js filename=intro
const obj /*:object*/ = {
  foo() {
    debugger;
    const tmpCalleeParam /*:object*/ = { x: 1 };
    const tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
    return tmpReturnArg;
  },
};
const tmpObjSpread /*:unknown*/ = obj.foo();
const tmpCalleeParam$1 /*:object*/ = { ...tmpObjSpread };
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpread = {
  foo() {
    const tmpReturnArg = $({ x: 1 });
    return tmpReturnArg;
  },
}.foo();
$({ ...tmpObjSpread });
`````

## Pre Normal


`````js filename=intro
const obj = {
  foo() {
    debugger;
    return $({ x: 1 });
  },
};
$({ ...obj.foo() });
`````

## Normalized


`````js filename=intro
const obj = {
  foo() {
    debugger;
    const tmpCalleeParam = { x: 1 };
    const tmpReturnArg = $(tmpCalleeParam);
    return tmpReturnArg;
  },
};
const tmpObjSpread = obj.foo();
const tmpCalleeParam$1 = { ...tmpObjSpread };
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { foo(  ) {
  debugger;
  const b = { x: 1 };
  const c = $( b );
  return c;
} };
const d = a.foo();
const e = { ... d };
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
