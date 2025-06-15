# Preval test case

# assigned.md

> Array methods > Map > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  x = [1, 2, 3].map($);
  $(x);
}
f();
$(f);
$(x);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpArrenow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  const tmpArrin$1 /*:boolean*/ = 1 in tmpMCOO;
  const tmpArreout /*:array*/ /*truthy*/ = [tmpArrenow];
  if (tmpArrin$1) {
    const tmpArrel$1 /*:primitive*/ = tmpMCOO[1];
    const tmpArrenow$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$1, 1, tmpMCOO);
    tmpArreout[1] = tmpArrenow$1;
  } else {
  }
  const tmpArrin$2 /*:boolean*/ = 2 in tmpMCOO;
  if (tmpArrin$2) {
    const tmpArrel$2 /*:primitive*/ = tmpMCOO[2];
    const tmpArrenow$2 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$2, 2, tmpMCOO);
    tmpArreout[2] = tmpArrenow$2;
  } else {
  }
  tmpArreout.length = 3;
  x = tmpArreout;
  $(tmpArreout);
  return undefined;
};
let x /*:unknown*/ = 1;
f();
$(f);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpMCOO = [1, 2, 3];
  const tmpArrenow = $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  const tmpArrin$1 = 1 in tmpMCOO;
  const tmpArreout = [tmpArrenow];
  if (tmpArrin$1) {
    const tmpArrenow$1 = $dotCall($, undefined, undefined, tmpMCOO[1], 1, tmpMCOO);
    tmpArreout[1] = tmpArrenow$1;
  }
  if (2 in tmpMCOO) {
    const tmpArrenow$2 = $dotCall($, undefined, undefined, tmpMCOO[2], 2, tmpMCOO);
    tmpArreout[2] = tmpArrenow$2;
  }
  tmpArreout.length = 3;
  x = tmpArreout;
  $(tmpArreout);
};
let x = 1;
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
  k = e;
  $( e );
  return undefined;
};
let k = 1;
a();
$( a );
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCOO = [1, 2, 3];
  const tmpMCF = tmpMCOO.map;
  x = $dotCall(tmpMCF, tmpMCOO, `map`, $);
  $(x);
  return undefined;
};
let x = 1;
f();
$(f);
$(x);
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
 - 4: [1, 2, 3]
 - 5: '<function>'
 - 6: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
