# Preval test case

# arguments_param_mismatch.md

> Arguments > Ai > Arguments param mismatch
>
> Test parameter count mismatch with arguments

## Input

`````js filename=intro
function testParamMismatch(a, b, c) {
  const paramCount = 3;
  const argCount = arguments.length;
  const first = arguments[0];
  const second = arguments[1];
  const third = arguments[2];
  const fourth = arguments[3];
  $(paramCount, argCount, first, second, third, fourth);
}

testParamMismatch(1);
testParamMismatch(1, 2);
testParamMismatch(1, 2, 3);
testParamMismatch(1, 2, 3, 4);
testParamMismatch(1, 2, 3, 4, 5);
`````


## Settled


`````js filename=intro
const testParamMismatch /*:(unused, unused, unused)=>undefined*/ = function ($$0, $$1, $$2 /*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  const tmpPrevalAliasArgumentsLen$1 /*:number*/ = arguments.length;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const second /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const third /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  const fourth /*:unknown*/ = tmpPrevalAliasArgumentsAny[3];
  $(3, tmpPrevalAliasArgumentsLen$1, first, second, third, fourth);
  return undefined;
};
testParamMismatch(1);
testParamMismatch(1, 2);
testParamMismatch(1, 2, 3);
testParamMismatch(1, 2, 3, 4);
testParamMismatch(1, 2, 3, 4, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testParamMismatch = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(
    3,
    arguments.length,
    tmpPrevalAliasArgumentsAny[0],
    tmpPrevalAliasArgumentsAny[1],
    tmpPrevalAliasArgumentsAny[2],
    tmpPrevalAliasArgumentsAny[3],
  );
};
testParamMismatch(1);
testParamMismatch(1, 2);
testParamMismatch(1, 2, 3);
testParamMismatch(1, 2, 3, 4);
testParamMismatch(1, 2, 3, 4, 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = c;
  const d = c.length;
  debugger;
  const e = b[ 0 ];
  const f = b[ 1 ];
  const g = b[ 2 ];
  const h = b[ 3 ];
  $( 3, d, e, f, g, h );
  return undefined;
};
a( 1 );
a( 1, 2 );
a( 1, 2, 3 );
a( 1, 2, 3, 4 );
a( 1, 2, 3, 4, 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testParamMismatch = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  const paramCount = 3;
  const argCount = tmpPrevalAliasArgumentsLen;
  const first = tmpPrevalAliasArgumentsAny[0];
  const second = tmpPrevalAliasArgumentsAny[1];
  const third = tmpPrevalAliasArgumentsAny[2];
  const fourth = tmpPrevalAliasArgumentsAny[3];
  $(paramCount, argCount, first, second, third, fourth);
  return undefined;
};
testParamMismatch(1);
testParamMismatch(1, 2);
testParamMismatch(1, 2, 3);
testParamMismatch(1, 2, 3, 4);
testParamMismatch(1, 2, 3, 4, 5);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 1, 1, undefined, undefined, undefined
 - 2: 3, 2, 1, 2, undefined, undefined
 - 3: 3, 3, 1, 2, 3, undefined
 - 4: 3, 4, 1, 2, 3, 4
 - 5: 3, 5, 1, 2, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
