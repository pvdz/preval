# Preval test case

# arguments_rest_parameter.md

> Arguments > Ai > Arguments rest parameter
>
> Test arguments with rest parameters

## Input

`````js filename=intro
function testArgsRestParam(a, b, ...rest) {
  const argsLen = arguments.length;
  const restLen = rest.length;
  $(argsLen, restLen, rest);
}
testArgsRestParam(1, 2, 3, 4, 5);
`````


## Settled


`````js filename=intro
const testArgsRestParam /*:(unused, unused, array)=>undefined*/ = function ($$0, $$1, ...$$2 /*:array*/ /*uses arguments*/) {
  const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
  const rest /*:array*/ /*truthy*/ = $$2;
  debugger;
  const restLen /*:number*/ = rest.length;
  $(tmpPrevalAliasArgumentsLen, restLen, rest);
  return undefined;
};
testArgsRestParam(1, 2, 3, 4, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsRestParam = function ($$0, $$1, ...$$2 /*:array*/) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const rest = $$2;
  $(tmpPrevalAliasArgumentsLen, rest.length, rest);
};
testArgsRestParam(1, 2, 3, 4, 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = c.length;
  const d = $$2;
  debugger;
  const e = d.length;
  $( b, e, d );
  return undefined;
};
a( 1, 2, 3, 4, 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsRestParam = function ($$0, $$1, ...$$2 /*:array*/) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let rest = $$2;
  debugger;
  const argsLen = tmpPrevalAliasArgumentsLen;
  const restLen = rest.length;
  $(argsLen, restLen, rest);
  return undefined;
};
testArgsRestParam(1, 2, 3, 4, 5);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5, 3, [3, 4, 5]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
