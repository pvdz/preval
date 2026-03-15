# Preval test case

# necessary.md

> Dot call > Necessary
>
> Dont need dotcall on a func that does not access `this`

## Input

`````js filename=intro
function f(arg) {
  if (arg) $('x', this);
}
f.call({}, $(1));
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>undefined*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const arg /*:unknown*/ = $$0;
  debugger;
  if (arg) {
    $(`x`, tmpPrevalAliasThis);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpMCP$1 /*:unknown*/ = $(1);
const tmpMCP /*:object*/ /*truthy*/ = {};
$dotCall($function_call, f, `call`, tmpMCP, tmpMCP$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (arg) {
  const tmpPrevalAliasThis = this;
  if (arg) {
    $(`x`, tmpPrevalAliasThis);
  }
};
const tmpMCP$1 = $(1);
$dotCall($function_call, f, `call`, {}, tmpMCP$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  const c = $$0;
  debugger;
  if (c) {
    $( "x", b );
    return undefined;
  }
  else {
    return undefined;
  }
};
const d = $( 1 );
const e = {};
$dotCall( $function_call, a, "call", e, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasThis = this;
  let arg = $$0;
  debugger;
  if (arg) {
    $(`x`, tmpPrevalAliasThis);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpMCF = f.call;
const tmpMCP = {};
const tmpMCP$1 = $(1);
$dotCall(tmpMCF, f, `call`, tmpMCP, tmpMCP$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) this may support .call .apply and .bind but I think that different reducers should tackle it


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'x', {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
