# Preval test case

# unsafe_verified.md

> Normalize > This > Unsafe verified
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

## Input

`````js filename=intro
function f() {
  const x = this;
  $(x);
  function g() {
     $(x);
     return x.y; // The x should not be inlined
  }
  return g();
}
$(f.call({y: 1}));
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  $(tmpPrevalAliasThis);
  $(tmpPrevalAliasThis);
  const tmpReturnArg /*:unknown*/ = tmpPrevalAliasThis.y;
  return tmpReturnArg;
};
const tmpCalleeParam$1 /*:object*/ = { y: 1 };
const tmpCalleeParam /*:unknown*/ = f.call(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis);
  $(tmpPrevalAliasThis);
  const tmpReturnArg = tmpPrevalAliasThis.y;
  return tmpReturnArg;
};
$(f.call({ y: 1 }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  $( b );
  $( b );
  const c = b.y;
  return c;
};
const d = { y: 1 };
const e = a.call( d );
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: { y: '1' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
