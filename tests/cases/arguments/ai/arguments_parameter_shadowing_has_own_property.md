# Preval test case

# arguments_parameter_shadowing_has_own_property.md

> Arguments > Ai > Arguments parameter shadowing has own property
>
> Test parameter shadowing with hasOwnProperty

## Input

`````js filename=intro
function testArgsParameterShadowingHasOwnProperty() {
  const hasZero = arguments.hasOwnProperty('0');
  const hasLength = arguments.hasOwnProperty('length');
  const hasCustom = arguments.hasOwnProperty('custom');
  $(hasZero, hasLength, hasCustom);
}

testArgsParameterShadowingHasOwnProperty('test');
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingHasOwnProperty /*:()=>undefined*/ = function (/*uses arguments*/) {
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
testArgsParameterShadowingHasOwnProperty(`test`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingHasOwnProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(
    tmpPrevalAliasArgumentsAny.hasOwnProperty(`0`),
    tmpPrevalAliasArgumentsAny.hasOwnProperty(`length`),
    tmpPrevalAliasArgumentsAny.hasOwnProperty(`custom`),
  );
};
testArgsParameterShadowingHasOwnProperty(`test`);
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
let testArgsParameterShadowingHasOwnProperty = function () {
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
testArgsParameterShadowingHasOwnProperty(`test`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet


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
