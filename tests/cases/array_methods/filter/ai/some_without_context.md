# Preval test case

# some_without_context.md

> Array methods > Filter > Ai > Some without context
>
> Test: Array.filter without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].filter(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpLambdaFilterWas /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
if (tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
} else {
}
const tmpLambdaFilterWas$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
if (tmpLambdaFilterWas$1) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 2);
} else {
}
const tmpLambdaFilterWas$2 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
if (tmpLambdaFilterWas$2) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 3);
  $(result, tmpLambdaFilterOut);
} else {
  $(result, tmpLambdaFilterOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
const tmpLambdaFilterWas = $dotCall(tmpMCP, undefined, undefined);
const tmpLambdaFilterOut = [];
if (tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
}
if ($dotCall(tmpMCP, undefined, undefined)) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 2);
}
if ($dotCall(tmpMCP, undefined, undefined)) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 3);
  $(result, tmpLambdaFilterOut);
} else {
  $(result, tmpLambdaFilterOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function() {
  const c = this;
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = $dotCall( b, undefined, undefined );
const f = [];
if (e) {
  $dotCall( $array_push, f, "push", 1 );
}
const g = $dotCall( b, undefined, undefined );
if (g) {
  $dotCall( $array_push, f, "push", 2 );
}
const h = $dotCall( b, undefined, undefined );
if (h) {
  $dotCall( $array_push, f, "push", 3 );
  $( a, f );
}
else {
  $( a, f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.filter;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `filter`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true, true], []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
