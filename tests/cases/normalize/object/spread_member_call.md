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
const tmpCallCompVal /*:unknown*/ = obj.foo;
const tmpObjSpread /*:unknown*/ = $dotCall(tmpCallCompVal, obj, `foo`);
const tmpCalleeParam$1 /*:object*/ = { ...tmpObjSpread };
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = {
  foo() {
    const tmpReturnArg = $({ x: 1 });
    return tmpReturnArg;
  },
};
const tmpObjSpread = obj.foo();
$({ ...tmpObjSpread });
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
const d = a.foo;
const e = $dotCall( d, a, "foo" );
const f = { ... e };
$( f );
`````


## Todos triggered


None


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
