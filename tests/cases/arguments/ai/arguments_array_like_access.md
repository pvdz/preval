# Preval test case

# arguments_array_like_access.md

> Arguments > Ai > Arguments array like access
>
> Test array-like access to arguments object

## Input

`````js filename=intro
function testArgsArrayAccess() {
  const first = arguments[0];
  const second = arguments[1];
  const third = arguments[2];
  $(first, second, third);
}
testArgsArrayAccess('a', 'b', 'c');
`````


## Settled


`````js filename=intro
const testArgsArrayAccess /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const second /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const third /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  $(first, second, third);
  return undefined;
};
testArgsArrayAccess(`a`, `b`, `c`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsArrayAccess = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(tmpPrevalAliasArgumentsAny[0], tmpPrevalAliasArgumentsAny[1], tmpPrevalAliasArgumentsAny[2]);
};
testArgsArrayAccess(`a`, `b`, `c`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = b[ 1 ];
  const f = b[ 2 ];
  $( d, e, f );
  return undefined;
};
a( "a", "b", "c" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsArrayAccess = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const first = tmpPrevalAliasArgumentsAny[0];
  const second = tmpPrevalAliasArgumentsAny[1];
  const third = tmpPrevalAliasArgumentsAny[2];
  $(first, second, third);
  return undefined;
};
testArgsArrayAccess(`a`, `b`, `c`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a', 'b', 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
