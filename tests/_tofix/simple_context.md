# Preval test case

# simple_context.md

> Tofix > simple context
>
> Inlining $dotCall cases when we know what they are actually doing

the context can be inlined easily and safely in this trivial case

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
const f /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  $(tmpPrevalAliasThis);
  return undefined;
};
const tmpMCP /*:object*/ /*truthy*/ = { pass: 1 };
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const x = tmpPrevalAliasThis;
  $(tmpPrevalAliasThis);
  return undefined;
};
const tmpMCF = f.call;
const tmpMCP = { pass: 1 };
$dotCall(tmpMCF, f, `call`, tmpMCP);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) this may support .call .apply and .bind but I think that different reducers should tackle it


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
