# Preval test case

# expr.md

> Array methods > Foreach > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  // forEach always returns undefined but you can still assign/init it.
  const arr = [1, 2, 3];
  arr.forEach($);
}
f();
$(f);
$(x);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  $dotCall($, undefined, undefined, 1, 0, arr);
  const tmpArrin$1 /*:boolean*/ = 1 in arr;
  if (tmpArrin$1) {
    const tmpArrel$1 /*:primitive*/ = arr[1];
    $dotCall($, undefined, undefined, tmpArrel$1, 1, arr);
  } else {
  }
  const tmpArrin$2 /*:boolean*/ = 2 in arr;
  if (tmpArrin$2) {
    const tmpArrel$2 /*:primitive*/ = arr[2];
    $dotCall($, undefined, undefined, tmpArrel$2, 2, arr);
    return undefined;
  } else {
    return undefined;
  }
};
f();
$(f);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const arr = [1, 2, 3];
  $dotCall($, undefined, undefined, 1, 0, arr);
  if (1 in arr) {
    $dotCall($, undefined, undefined, arr[1], 1, arr);
  }
  if (2 in arr) {
    $dotCall($, undefined, undefined, arr[2], 2, arr);
  }
};
f();
$(f);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  $dotCall( $, undefined, undefined, 1, 0, b );
  const c = 1 in b;
  if (c) {
    const d = b[ 1 ];
    $dotCall( $, undefined, undefined, d, 1, b );
  }
  const e = 2 in b;
  if (e) {
    const f = b[ 2 ];
    $dotCall( $, undefined, undefined, f, 2, b );
    return undefined;
  }
  else {
    return undefined;
  }
};
a();
$( a );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const arr = [1, 2, 3];
  const tmpMCF = arr.forEach;
  $dotCall(tmpMCF, arr, `forEach`, $);
  return undefined;
};
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 2, 1, [1, 2, 3]
 - 3: 3, 2, [1, 2, 3]
 - 4: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
