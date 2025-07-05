# Preval test case

# arguments_empty_function.md

> Arguments > Ai > Arguments empty function
>
> Test arguments access in function with no parameters

## Input

`````js filename=intro
function testArgsEmpty() {
  const len = arguments.length;
  const first = arguments[0];
  const second = arguments[1];
  $(len, first, second);
}
testArgsEmpty();
`````


## Settled


`````js filename=intro
const testArgsEmpty /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const second /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  $(0, first, second);
  return undefined;
};
testArgsEmpty();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsEmpty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(0, tmpPrevalAliasArgumentsAny[0], tmpPrevalAliasArgumentsAny[1]);
};
testArgsEmpty();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = b[ 1 ];
  $( 0, d, e );
  return undefined;
};
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsEmpty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  const first = tmpPrevalAliasArgumentsAny[0];
  const second = tmpPrevalAliasArgumentsAny[1];
  $(len, first, second);
  return undefined;
};
testArgsEmpty();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
