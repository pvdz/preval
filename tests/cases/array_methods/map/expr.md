# Preval test case

# expr.md

> Array methods > Map > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.map($);
}
f();
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const arr /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpArrenow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, arr);
  const tmpArrin$1 /*:boolean*/ = 1 in arr;
  const tmpArreout /*:array*/ /*truthy*/ = [tmpArrenow];
  if (tmpArrin$1) {
    const tmpArrel$1 /*:primitive*/ = arr[1];
    const tmpArrenow$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$1, 1, arr);
    tmpArreout[1] = tmpArrenow$1;
  } else {
  }
  const tmpArrin$2 /*:boolean*/ = 2 in arr;
  if (tmpArrin$2) {
    const tmpArrel$2 /*:primitive*/ = arr[2];
    const tmpArrenow$2 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$2, 2, arr);
    tmpArreout[2] = tmpArrenow$2;
  } else {
  }
  tmpArreout.length = 3;
  return undefined;
};
f();
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const arr = [1, 2, 3];
  const tmpArrenow = $dotCall($, undefined, undefined, 1, 0, arr);
  const tmpArrin$1 = 1 in arr;
  const tmpArreout = [tmpArrenow];
  if (tmpArrin$1) {
    const tmpArrenow$1 = $dotCall($, undefined, undefined, arr[1], 1, arr);
    tmpArreout[1] = tmpArrenow$1;
  }
  if (2 in arr) {
    const tmpArrenow$2 = $dotCall($, undefined, undefined, arr[2], 2, arr);
    tmpArreout[2] = tmpArrenow$2;
  }
  tmpArreout.length = 3;
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
  const d = 1 in b;
  const e = [ c ];
  if (d) {
    const f = b[ 1 ];
    const g = $dotCall( $, undefined, undefined, f, 1, b );
    e[1] = g;
  }
  const h = 2 in b;
  if (h) {
    const i = b[ 2 ];
    const j = $dotCall( $, undefined, undefined, i, 2, b );
    e[2] = j;
  }
  e.length = 3;
  return undefined;
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
  const tmpMCF = arr.map;
  $dotCall(tmpMCF, arr, `map`, $);
  return undefined;
};
f();
$(f);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map


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
