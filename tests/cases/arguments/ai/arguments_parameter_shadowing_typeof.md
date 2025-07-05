# Preval test case

# arguments_parameter_shadowing_typeof.md

> Arguments > Ai > Arguments parameter shadowing typeof
>
> Test parameter shadowing with typeof checks

## Input

`````js filename=intro
function testArgsParameterShadowingTypeof() {
  const type = typeof arguments;
  const isArray = Array.isArray(arguments);
  const constructor = arguments.constructor.name;
  $(type, isArray, constructor);
}

testArgsParameterShadowingTypeof(1, 2, 3);
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingTypeof /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const isArray /*:boolean*/ = $Array_isArray(tmpPrevalAliasArgumentsAny);
  const tmpCompObj /*:unknown*/ = tmpPrevalAliasArgumentsAny.constructor;
  const constructor /*:unknown*/ = tmpCompObj.name;
  $(`object`, isArray, constructor);
  return undefined;
};
testArgsParameterShadowingTypeof(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingTypeof = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(`object`, $Array_isArray(tmpPrevalAliasArgumentsAny), tmpPrevalAliasArgumentsAny.constructor.name);
};
testArgsParameterShadowingTypeof(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = $Array_isArray( b );
  const e = b.constructor;
  const f = e.name;
  $( "object", d, f );
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingTypeof = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const type = typeof tmpPrevalAliasArgumentsAny;
  const tmpMCF = $Array_isArray;
  const isArray = $Array_isArray(tmpPrevalAliasArgumentsAny);
  const tmpCompObj = tmpPrevalAliasArgumentsAny.constructor;
  const constructor = tmpCompObj.name;
  $(type, isArray, constructor);
  return undefined;
};
testArgsParameterShadowingTypeof(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) type trackeed tricks can possibly support static $Array_isArray


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'object', false, 'Object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
