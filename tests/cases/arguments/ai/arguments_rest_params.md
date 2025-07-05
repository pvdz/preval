# Preval test case

# arguments_rest_params.md

> Arguments > Ai > Arguments rest params
>
> Test rest parameters with arguments

## Input

`````js filename=intro
function testRestParams(a, b, ...rest) {
  const argsLen = arguments.length;
  const restLen = rest.length;
  const first = arguments[0];
  const second = arguments[1];
  const third = arguments[2];
  $(argsLen, restLen, first, second, third, rest);
}

testRestParams(1);
testRestParams(1, 2);
testRestParams(1, 2, 3);
testRestParams(1, 2, 3, 4, 5);
`````


## Settled


`````js filename=intro
const testRestParams /*:(unused, unused, array)=>undefined*/ = function ($$0, $$1, ...$$2 /*:array*/ /*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
  const rest /*:array*/ /*truthy*/ = $$2;
  debugger;
  const restLen /*:number*/ = rest.length;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const second /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const third /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  $(tmpPrevalAliasArgumentsLen, restLen, first, second, third, rest);
  return undefined;
};
testRestParams(1);
testRestParams(1, 2);
testRestParams(1, 2, 3);
testRestParams(1, 2, 3, 4, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testRestParams = function ($$0, $$1, ...$$2 /*:array*/) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const rest = $$2;
  $(
    tmpPrevalAliasArgumentsLen,
    rest.length,
    tmpPrevalAliasArgumentsAny[0],
    tmpPrevalAliasArgumentsAny[1],
    tmpPrevalAliasArgumentsAny[2],
    rest,
  );
};
testRestParams(1);
testRestParams(1, 2);
testRestParams(1, 2, 3);
testRestParams(1, 2, 3, 4, 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = c;
  const d = c.length;
  const e = $$2;
  debugger;
  const f = e.length;
  const g = b[ 0 ];
  const h = b[ 1 ];
  const i = b[ 2 ];
  $( d, f, g, h, i, e );
  return undefined;
};
a( 1 );
a( 1, 2 );
a( 1, 2, 3 );
a( 1, 2, 3, 4, 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testRestParams = function ($$0, $$1, ...$$2 /*:array*/) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let rest = $$2;
  debugger;
  const argsLen = tmpPrevalAliasArgumentsLen;
  const restLen = rest.length;
  const first = tmpPrevalAliasArgumentsAny[0];
  const second = tmpPrevalAliasArgumentsAny[1];
  const third = tmpPrevalAliasArgumentsAny[2];
  $(argsLen, restLen, first, second, third, rest);
  return undefined;
};
testRestParams(1);
testRestParams(1, 2);
testRestParams(1, 2, 3);
testRestParams(1, 2, 3, 4, 5);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, 1, undefined, undefined, []
 - 2: 2, 0, 1, 2, undefined, []
 - 3: 3, 1, 1, 2, 3, [3]
 - 4: 5, 3, 1, 2, 3, [3, 4, 5]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
