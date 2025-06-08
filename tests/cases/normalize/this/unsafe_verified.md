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
  const tmpPrevalAliasThis /*:object*/ /*truthy*/ = this;
  debugger;
  $(tmpPrevalAliasThis);
  $(tmpPrevalAliasThis);
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = tmpPrevalAliasThis.y;
  return tmpClusterSSA_tmpReturnArg$1;
};
const tmpMCP /*:object*/ /*truthy*/ = { y: 1 };
const tmpCalleeParam /*:unknown*/ /*truthy*/ = $dotCall($function_call, f, `call`, tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis);
  $(tmpPrevalAliasThis);
  const tmpClusterSSA_tmpReturnArg$1 = tmpPrevalAliasThis.y;
  return tmpClusterSSA_tmpReturnArg$1;
};
$($dotCall($function_call, f, `call`, { y: 1 }));
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
const e = $dotCall( $function_call, a, "call", d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    $(x);
    const tmpReturnArg = x.y;
    return tmpReturnArg;
  };
  const x = tmpPrevalAliasThis;
  $(tmpPrevalAliasThis);
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpMCF = f.call;
const tmpMCP = { y: 1 };
let tmpCalleeParam = $dotCall(tmpMCF, f, `call`, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


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
