# Preval test case

# arguments_delete_property.md

> Arguments > Ai > Arguments delete property
>
> Test deleting properties from arguments

## Input

`````js filename=intro
function testArgsDeleteProperty() {
  const originalLength = arguments.length;
  const deleteResult = delete arguments[0];
  const newLength = arguments.length;
  $(deleteResult, originalLength, newLength);
}
testArgsDeleteProperty(1, 2, 3);
`````


## Settled


`````js filename=intro
const testArgsDeleteProperty /*:()=>unknown*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const deleteResult /*:boolean*/ = delete tmpPrevalAliasArgumentsAny[0];
  $(deleteResult, 3, 3);
  return undefined;
};
testArgsDeleteProperty(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsDeleteProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(delete tmpPrevalAliasArgumentsAny[0], 3, 3);
};
testArgsDeleteProperty(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = delete b[ 0 ];
  $( d, 3, 3 );
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsDeleteProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const originalLength = tmpPrevalAliasArgumentsLen;
  const deleteResult = delete tmpPrevalAliasArgumentsAny[0];
  const newLength = tmpPrevalAliasArgumentsLen;
  $(deleteResult, originalLength, tmpPrevalAliasArgumentsLen);
  return undefined;
};
testArgsDeleteProperty(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
