# Preval test case

# dupe_this.md

> Const aliasing > Dupe this
>
> Minimal test case that, at the time of writing, would still leave an alias for the `this` alias again in the output.

## Input

`````js filename=intro
const f = function($$0) {
  const tmpPrevalAliasThis = this;
  debugger;
  tmpPrevalAliasThis.e$;
  tmpPrevalAliasThis.e$;
};
$(f);
`````


## Settled


`````js filename=intro
const f /*:(unused)=>unknown*/ = function ($$0) {
  const tmpPrevalAliasThis$1 /*:object*/ /*truthy*/ = this;
  debugger;
  tmpPrevalAliasThis$1.e$;
  tmpPrevalAliasThis$1.e$;
  return undefined;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function ($$0) {
  const tmpPrevalAliasThis$1 = this;
  tmpPrevalAliasThis$1.e$;
  tmpPrevalAliasThis$1.e$;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  debugger;
  b.e$;
  b.e$;
  return undefined;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasThis$1 = this;
  let $dlr_$$0 = $$0;
  debugger;
  const tmpPrevalAliasThis = tmpPrevalAliasThis$1;
  tmpPrevalAliasThis.e$;
  tmpPrevalAliasThis.e$;
  return undefined;
};
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
