# Preval test case

# arguments_default_parameters.md

> Arguments > Ai > Arguments default parameters
>
> Test arguments with default parameters

## Input

`````js filename=intro
function testArgsDefaultParams(a = 'default', b = 42) {
  const argsLen = arguments.length;
  const first = arguments[0];
  const second = arguments[1];
  $(argsLen, first, second, a, b);
}
testArgsDefaultParams();
`````


## Settled


`````js filename=intro
const testArgsDefaultParams /*:(unused, unused)=>undefined*/ = function ($$0, $$1 /*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const second /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  $(0, first, second, `default`, 42);
  return undefined;
};
testArgsDefaultParams();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsDefaultParams = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(0, tmpPrevalAliasArgumentsAny[0], tmpPrevalAliasArgumentsAny[1], `default`, 42);
};
testArgsDefaultParams();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = b[ 1 ];
  $( 0, d, e, "default", 42 );
  return undefined;
};
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsDefaultParams = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = `default`;
  } else {
    a = tmpParamBare;
  }
  let b = undefined;
  const tmpIfTest$1 = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
    b = 42;
  } else {
    b = tmpParamBare$1;
  }
  const argsLen = tmpPrevalAliasArgumentsLen;
  const first = tmpPrevalAliasArgumentsAny[0];
  const second = tmpPrevalAliasArgumentsAny[1];
  $(argsLen, first, second, a, b);
  return undefined;
};
testArgsDefaultParams();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, undefined, undefined, 'default', 42
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
