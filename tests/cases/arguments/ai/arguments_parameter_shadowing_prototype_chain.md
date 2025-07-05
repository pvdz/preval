# Preval test case

# arguments_parameter_shadowing_prototype_chain.md

> Arguments > Ai > Arguments parameter shadowing prototype chain
>
> Test parameter shadowing with prototype chain checks

## Input

`````js filename=intro
function testArgsParameterShadowingPrototypeChain() {
  const isArguments = arguments instanceof Arguments;
  const proto = Object.getPrototypeOf(arguments);
  const protoName = proto.constructor.name;
  $(isArguments, protoName);
}

testArgsParameterShadowingPrototypeChain(1, 2, 3);
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingPrototypeChain /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const isArguments /*:boolean*/ = tmpPrevalAliasArgumentsAny instanceof Arguments;
  const proto /*:object*/ /*truthy*/ = $Object_getPrototypeOf(tmpPrevalAliasArgumentsAny);
  const tmpCompObj /*:unknown*/ = proto.constructor;
  const protoName /*:unknown*/ = tmpCompObj.name;
  $(isArguments, protoName);
  return undefined;
};
testArgsParameterShadowingPrototypeChain(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingPrototypeChain = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(tmpPrevalAliasArgumentsAny instanceof Arguments, $Object_getPrototypeOf(tmpPrevalAliasArgumentsAny).constructor.name);
};
testArgsParameterShadowingPrototypeChain(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b instanceof Arguments;
  const e = $Object_getPrototypeOf( b );
  const f = e.constructor;
  const g = f.name;
  $( d, g );
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingPrototypeChain = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const isArguments = tmpPrevalAliasArgumentsAny instanceof Arguments;
  const tmpMCF = $Object_getPrototypeOf;
  const proto = $Object_getPrototypeOf(tmpPrevalAliasArgumentsAny);
  const tmpCompObj = proto.constructor;
  const protoName = tmpCompObj.name;
  $(isArguments, protoName);
  return undefined;
};
testArgsParameterShadowingPrototypeChain(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $object_constructor
- (todo) inline arguments when function does not have that many params yet
- (todo) type trackeed tricks can possibly support static $Object_getPrototypeOf


## Globals


BAD@! Found 1 implicit global bindings:

Arguments


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
