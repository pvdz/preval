# Preval test case

# expr.md

> Array methods > Filter > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.filter($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaFilterWas /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
  if (tmpLambdaFilterWas) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
  } else {
  }
  const tmpLambdaFilterHas$1 /*:boolean*/ = 1 in arr;
  if (tmpLambdaFilterHas$1) {
    const tmpLambdaFilterVal$1 /*:primitive*/ = arr[1];
    const tmpLambdaFilterWas$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpLambdaFilterVal$1, 1, arr);
    if (tmpLambdaFilterWas$1) {
      $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$1);
    } else {
    }
  } else {
  }
  const tmpLambdaFilterHas$2 /*:boolean*/ = 2 in arr;
  if (tmpLambdaFilterHas$2) {
    const tmpLambdaFilterVal$2 /*:primitive*/ = arr[2];
    const tmpLambdaFilterWas$2 /*:unknown*/ = $dotCall($, undefined, undefined, tmpLambdaFilterVal$2, 2, arr);
    if (tmpLambdaFilterWas$2) {
      $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$2);
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
f();
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const arr = [1, 2, 3];
  const tmpLambdaFilterWas = $dotCall($, undefined, undefined, 1, 0, arr);
  const tmpLambdaFilterOut = [];
  if (tmpLambdaFilterWas) {
    $dotCall($array_push, tmpLambdaFilterOut, `push`, 1);
  }
  if (1 in arr) {
    const tmpLambdaFilterVal$1 = arr[1];
    if ($dotCall($, undefined, undefined, tmpLambdaFilterVal$1, 1, arr)) {
      $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$1);
    }
  }
  if (2 in arr) {
    const tmpLambdaFilterVal$2 = arr[2];
    if ($dotCall($, undefined, undefined, tmpLambdaFilterVal$2, 2, arr)) {
      $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$2);
    }
  }
};
f();
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  const c = $dotCall( $, undefined, undefined, 1, 0, b );
  const d = [];
  if (c) {
    $dotCall( $array_push, d, "push", 1 );
  }
  const e = 1 in b;
  if (e) {
    const f = b[ 1 ];
    const g = $dotCall( $, undefined, undefined, f, 1, b );
    if (g) {
      $dotCall( $array_push, d, "push", f );
    }
  }
  const h = 2 in b;
  if (h) {
    const i = b[ 2 ];
    const j = $dotCall( $, undefined, undefined, i, 2, b );
    if (j) {
      $dotCall( $array_push, d, "push", i );
      return undefined;
    }
    else {
      return undefined;
    }
  }
  else {
    return undefined;
  }
};
a();
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const arr = [1, 2, 3];
  const tmpMCF = arr.filter;
  $dotCall(tmpMCF, arr, `filter`, $);
  return undefined;
};
f();
$(f);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init MemberExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 2, 1, [1, 2, 3]
 - 3: 3, 2, [1, 2, 3]
 - 4: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
