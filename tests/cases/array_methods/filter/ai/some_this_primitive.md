# Preval test case

# some_this_primitive.md

> Array methods > Filter > Ai > Some this primitive
>
> Test: Array.filter with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].filter(function(x) { $(this === 42); }, 42);
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const tmpLambdaFilterWas /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
if (tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
} else {
}
const tmpLambdaFilterWas$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
if (tmpLambdaFilterWas$1) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 2);
} else {
}
const tmpLambdaFilterWas$2 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined);
if (tmpLambdaFilterWas$2) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 3);
  $(tmpLambdaFilterOut);
} else {
  $(tmpLambdaFilterOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
const tmpLambdaFilterWas = $dotCall(tmpMCP, 42, undefined);
const tmpLambdaFilterOut = [];
if (tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
}
if ($dotCall(tmpMCP, 42, undefined)) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 2);
}
if ($dotCall(tmpMCP, 42, undefined)) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 3);
  $(tmpLambdaFilterOut);
} else {
  $(tmpLambdaFilterOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
const d = $dotCall( a, 42, undefined );
const e = [];
if (d) {
  $dotCall( $array_push, e, "push", 1 );
}
const f = $dotCall( a, 42, undefined );
if (f) {
  $dotCall( $array_push, e, "push", 2 );
}
const g = $dotCall( a, 42, undefined );
if (g) {
  $dotCall( $array_push, e, "push", 3 );
  $( e );
}
else {
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.filter;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `filter`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
