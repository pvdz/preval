# Preval test case

# arguments_spread_operator.md

> Arguments > Ai > Arguments spread operator
>
> Test spreading arguments object

## Input

`````js filename=intro
function testArgsSpread() {
  const args = [...arguments];
  $(args);
}
testArgsSpread(1, 2, 3, 4, 5);
`````


## Settled


`````js filename=intro
const testArgsSpread /*:()=>unknown*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const args /*:array*/ /*truthy*/ = [...tmpPrevalAliasArgumentsAny];
  $(args);
  return undefined;
};
testArgsSpread(1, 2, 3, 4, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsSpread = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $([...tmpPrevalAliasArgumentsAny]);
};
testArgsSpread(1, 2, 3, 4, 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = [ ...b ];
  $( d );
  return undefined;
};
a( 1, 2, 3, 4, 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsSpread = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const args = [...tmpPrevalAliasArgumentsAny];
  $(args);
  return undefined;
};
testArgsSpread(1, 2, 3, 4, 5);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) Deal with array spreads in arr mutation?
- (todo) inline arguments when function does not have that many params yet


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 4, 5]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
