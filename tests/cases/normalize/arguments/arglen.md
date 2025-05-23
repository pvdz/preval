# Preval test case

# arglen.md

> Normalize > Arguments > Arglen
>
> This was causing a problem when arguments was passed on in a call.

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments.length);
}
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
  debugger;
  $dotCall($function_apply, f, `apply`, tmpPrevalAliasThis, tmpPrevalAliasArgumentsLen);
  return undefined;
};
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $dotCall($function_apply, f, `apply`, this, arguments.length);
};
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  const c = d.length;
  debugger;
  $dotCall( $function_apply, a, "apply", b, c );
  return undefined;
};
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const tmpMCF = f.apply;
  $dotCall(tmpMCF, f, `apply`, tmpPrevalAliasThis, tmpPrevalAliasArgumentsLen);
  return undefined;
};
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_apply


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
