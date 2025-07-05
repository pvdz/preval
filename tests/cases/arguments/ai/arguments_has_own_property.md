# Preval test case

# arguments_has_own_property.md

> Arguments > Ai > Arguments has own property
>
> Test hasOwnProperty checks on arguments

## Input

`````js filename=intro
function testArgsHasOwnProperty() {
  const hasZero = arguments.hasOwnProperty('0');
  const hasLength = arguments.hasOwnProperty('length');
  const hasCustom = arguments.hasOwnProperty('custom');
  $(hasZero, hasLength, hasCustom);
}
testArgsHasOwnProperty('test');
`````


## Settled


`````js filename=intro
const testArgsHasOwnProperty /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpMCF /*:unknown*/ = tmpPrevalAliasArgumentsAny.hasOwnProperty;
  const hasZero /*:unknown*/ = $dotCall(tmpMCF, tmpPrevalAliasArgumentsAny, `hasOwnProperty`, `0`);
  const tmpMCF$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny.hasOwnProperty;
  const hasLength /*:unknown*/ = $dotCall(tmpMCF$1, tmpPrevalAliasArgumentsAny, `hasOwnProperty`, `length`);
  const tmpMCF$3 /*:unknown*/ = tmpPrevalAliasArgumentsAny.hasOwnProperty;
  const hasCustom /*:unknown*/ = $dotCall(tmpMCF$3, tmpPrevalAliasArgumentsAny, `hasOwnProperty`, `custom`);
  $(hasZero, hasLength, hasCustom);
  return undefined;
};
testArgsHasOwnProperty(`test`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsHasOwnProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(
    tmpPrevalAliasArgumentsAny.hasOwnProperty(`0`),
    tmpPrevalAliasArgumentsAny.hasOwnProperty(`length`),
    tmpPrevalAliasArgumentsAny.hasOwnProperty(`custom`),
  );
};
testArgsHasOwnProperty(`test`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b.hasOwnProperty;
  const e = $dotCall( d, b, "hasOwnProperty", "0" );
  const f = b.hasOwnProperty;
  const g = $dotCall( f, b, "hasOwnProperty", "length" );
  const h = b.hasOwnProperty;
  const i = $dotCall( h, b, "hasOwnProperty", "custom" );
  $( e, g, i );
  return undefined;
};
a( "test" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsHasOwnProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpMCF = tmpPrevalAliasArgumentsAny.hasOwnProperty;
  const hasZero = $dotCall(tmpMCF, tmpPrevalAliasArgumentsAny, `hasOwnProperty`, `0`);
  const tmpMCF$1 = tmpPrevalAliasArgumentsAny.hasOwnProperty;
  const hasLength = $dotCall(tmpMCF$1, tmpPrevalAliasArgumentsAny, `hasOwnProperty`, `length`);
  const tmpMCF$3 = tmpPrevalAliasArgumentsAny.hasOwnProperty;
  const hasCustom = $dotCall(tmpMCF$3, tmpPrevalAliasArgumentsAny, `hasOwnProperty`, `custom`);
  $(hasZero, hasLength, hasCustom);
  return undefined;
};
testArgsHasOwnProperty(`test`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, true, false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
