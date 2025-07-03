# Preval test case

# some_with_context.md

> Array methods > Filter > Ai > Some with context
>
> Test: Array.filter with context

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].filter(function(x) { result.push(x * this.mult); }, ctx);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unknown)=>undefined*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const x$1 /*:unknown*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasThis.mult;
  const tmpMCP$1 /*:number*/ = x$1 * tmpBinBothRhs;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const ctx /*:object*/ /*truthy*/ = { mult: 2 };
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpLambdaFilterWas /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
if (tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
} else {
}
const tmpLambdaFilterHas$1 /*:boolean*/ = 1 in tmpMCOO;
if (tmpLambdaFilterHas$1) {
  const tmpLambdaFilterVal$1 /*:primitive*/ = tmpMCOO[1];
  const tmpLambdaFilterWas$1 /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, tmpLambdaFilterVal$1, 1, tmpMCOO);
  if (tmpLambdaFilterWas$1) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$1);
  } else {
  }
} else {
}
const tmpLambdaFilterHas$2 /*:boolean*/ = 2 in tmpMCOO;
if (tmpLambdaFilterHas$2) {
  const tmpLambdaFilterVal$2 /*:primitive*/ = tmpMCOO[2];
  const tmpLambdaFilterWas$2 /*:unknown*/ = $dotCall(tmpMCP, ctx, undefined, tmpLambdaFilterVal$2, 2, tmpMCOO);
  if (tmpLambdaFilterWas$2) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$2);
    $(result, tmpLambdaFilterOut);
  } else {
    $(result, tmpLambdaFilterOut);
  }
} else {
  $(result, tmpLambdaFilterOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function (x$1) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, x$1 * tmpPrevalAliasThis.mult);
};
const ctx = { mult: 2 };
const tmpMCOO = [1, 2, 3];
const tmpLambdaFilterWas = $dotCall(tmpMCP, ctx, undefined, 1, 0, tmpMCOO);
const tmpLambdaFilterOut = [];
if (tmpLambdaFilterWas) {
  $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
}
if (1 in tmpMCOO) {
  const tmpLambdaFilterVal$1 = tmpMCOO[1];
  if ($dotCall(tmpMCP, ctx, undefined, tmpLambdaFilterVal$1, 1, tmpMCOO)) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$1);
  }
}
if (2 in tmpMCOO) {
  const tmpLambdaFilterVal$2 = tmpMCOO[2];
  if ($dotCall(tmpMCP, ctx, undefined, tmpLambdaFilterVal$2, 2, tmpMCOO)) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$2);
    $(result, tmpLambdaFilterOut);
  } else {
    $(result, tmpLambdaFilterOut);
  }
} else {
  $(result, tmpLambdaFilterOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function($$0 ) {
  const c = this;
  const d = $$0;
  debugger;
  const e = c.mult;
  const f = d * e;
  $dotCall( $array_push, a, "push", f );
  return undefined;
};
const g = { mult: 2 };
const h = [ 1, 2, 3 ];
const i = $dotCall( b, g, undefined, 1, 0, h );
const j = [];
if (i) {
  $dotCall( $array_push, j, "push", 1 );
}
const k = 1 in h;
if (k) {
  const l = h[ 1 ];
  const m = $dotCall( b, g, undefined, l, 1, h );
  if (m) {
    $dotCall( $array_push, j, "push", l );
  }
}
const n = 2 in h;
if (n) {
  const o = h[ 2 ];
  const p = $dotCall( b, g, undefined, o, 2, h );
  if (p) {
    $dotCall( $array_push, j, "push", o );
    $( a, j );
  }
  else {
    $( a, j );
  }
}
else {
  $( a, j );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.filter;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpBinBothLhs = x$1;
  const tmpBinBothRhs = tmpPrevalAliasThis.mult;
  const tmpMCP$1 = tmpBinBothLhs * tmpBinBothRhs;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `filter`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 4, 6], []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
