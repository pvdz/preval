# Preval test case

# arguments_get_own_property.md

> Arguments > Ai > Arguments get own property
>
> Test Object.getOwnPropertyDescriptor on arguments

## Input

`````js filename=intro
function testArgsGetOwnProperty() {
  const lengthDesc = Object.getOwnPropertyDescriptor(arguments, 'length');
  const zeroDesc = Object.getOwnPropertyDescriptor(arguments, '0');
  const oneDesc = Object.getOwnPropertyDescriptor(arguments, '1');
  $(lengthDesc.configurable, lengthDesc.writable, zeroDesc.configurable, oneDesc.configurable);
}
testArgsGetOwnProperty(1, 2, 3);
`````


## Settled


`````js filename=intro
const testArgsGetOwnProperty /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const lengthDesc /*:object*/ /*truthy*/ = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  const zeroDesc /*:object*/ /*truthy*/ = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  const oneDesc /*:object*/ /*truthy*/ = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  const tmpCalleeParam /*:unknown*/ = lengthDesc.configurable;
  const tmpCalleeParam$1 /*:unknown*/ = lengthDesc.writable;
  const tmpCalleeParam$3 /*:unknown*/ = zeroDesc.configurable;
  const tmpCalleeParam$5 /*:unknown*/ = oneDesc.configurable;
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  return undefined;
};
testArgsGetOwnProperty(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsGetOwnProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const lengthDesc = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  const zeroDesc = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  const oneDesc = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  $(lengthDesc.configurable, lengthDesc.writable, zeroDesc.configurable, oneDesc.configurable);
};
testArgsGetOwnProperty(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = $Object_getOwnPropertyDescriptor( b );
  const e = $Object_getOwnPropertyDescriptor( b );
  const f = $Object_getOwnPropertyDescriptor( b );
  const g = d.configurable;
  const h = d.writable;
  const i = e.configurable;
  const j = f.configurable;
  $( g, h, i, j );
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsGetOwnProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpMCF = $Object_getOwnPropertyDescriptor;
  const tmpArgOverflow = tmpPrevalAliasArgumentsAny;
  const lengthDesc = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  const tmpMCF$1 = $Object_getOwnPropertyDescriptor;
  const tmpArgOverflow$1 = tmpPrevalAliasArgumentsAny;
  const zeroDesc = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  const tmpMCF$3 = $Object_getOwnPropertyDescriptor;
  const tmpArgOverflow$3 = tmpPrevalAliasArgumentsAny;
  const oneDesc = $Object_getOwnPropertyDescriptor(tmpPrevalAliasArgumentsAny);
  let tmpCalleeParam = lengthDesc.configurable;
  let tmpCalleeParam$1 = lengthDesc.writable;
  let tmpCalleeParam$3 = zeroDesc.configurable;
  let tmpCalleeParam$5 = oneDesc.configurable;
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  return undefined;
};
testArgsGetOwnProperty(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet
- (todo) type trackeed tricks can possibly support static $Object_getOwnPropertyDescriptor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, true, true, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - !eval returned: ('<crash[ <ref> is not function/iterable ]>')

Post settled calls: BAD!!
 - !eval returned: ('<crash[ <ref> is not function/iterable ]>')

Denormalized calls: BAD!!
 - !eval returned: ('<crash[ <ref> is not function/iterable ]>')
