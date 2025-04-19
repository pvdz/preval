# Preval test case

# this_func.md

> Constants > This func
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

## Input

`````js filename=intro
function f() {
    const x = this;
    $(x);
}
f.call({pass: 1});
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  $(tmpPrevalAliasThis);
  return undefined;
};
const tmpMCP /*:object*/ = { pass: 1 };
$dotCall($function_call, f, `call`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall(
  $function_call,
  function () {
    $(this);
  },
  `call`,
  { pass: 1 },
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  $( b );
  return undefined;
};
const c = { pass: 1 };
$dotCall( $function_call, a, "call", c );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { pass: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
