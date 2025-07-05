# Preval test case

# arguments_assign_spread.md

> Arguments > Ai > Arguments assign spread
>
> Test Object.assign and spread with arguments

## Input

`````js filename=intro
function testArgsAssignSpread() {
  const obj1 = { a: 1 };
  const obj2 = { b: 2 };
  const assigned = Object.assign({}, obj1, arguments, obj2);
  const spread = { ...obj1, ...arguments, ...obj2 };
  $(assigned, spread);
}
testArgsAssignSpread({ c: 3 }, { d: 4 });
`````


## Settled


`````js filename=intro
const testArgsAssignSpread /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpMCP /*:object*/ /*truthy*/ = {};
  const obj1 /*:object*/ /*truthy*/ = { a: 1 };
  const obj2 /*:object*/ /*truthy*/ = { b: 2 };
  const assigned /*:object*/ /*truthy*/ = $Object_assign(tmpMCP, obj1, tmpPrevalAliasArgumentsAny, obj2);
  const spread /*:object*/ /*truthy*/ = { ...obj1, ...tmpPrevalAliasArgumentsAny, ...obj2 };
  $(assigned, spread);
  return undefined;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = { c: 3 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { d: 4 };
testArgsAssignSpread(tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsAssignSpread = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpMCP = {};
  const obj1 = { a: 1 };
  const obj2 = { b: 2 };
  $($Object_assign(tmpMCP, obj1, tmpPrevalAliasArgumentsAny, obj2), { ...obj1, ...tmpPrevalAliasArgumentsAny, ...obj2 });
};
testArgsAssignSpread({ c: 3 }, { d: 4 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = {};
  const e = { a: 1 };
  const f = { b: 2 };
  const g = $Object_assign( d, e, b, f );
  const h = {
    ... e,
    ... b,
    ... f,
  };
  $( g, h );
  return undefined;
};
const i = { c: 3 };
const j = { d: 4 };
a( i, j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsAssignSpread = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const obj1 = { a: 1 };
  const obj2 = { b: 2 };
  const tmpMCF = $Object_assign;
  const tmpMCP = {};
  const assigned = $dotCall(tmpMCF, $object_constructor, `assign`, tmpMCP, obj1, tmpPrevalAliasArgumentsAny, obj2);
  const spread = { ...obj1, ...tmpPrevalAliasArgumentsAny, ...obj2 };
  $(assigned, spread);
  return undefined;
};
const tmpCallCallee = testArgsAssignSpread;
let tmpCalleeParam = { c: 3 };
let tmpCalleeParam$1 = { d: 4 };
testArgsAssignSpread(tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) type trackeed tricks can possibly support static $Object_assign


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  { 0: '{"c":"3"}', 1: '{"d":"4"}', a: '1', b: '2' },
  { 0: '{"c":"3"}', 1: '{"d":"4"}', a: '1', b: '2' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
