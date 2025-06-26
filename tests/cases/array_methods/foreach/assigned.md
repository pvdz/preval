# Preval test case

# assigned.md

> Array methods > Foreach > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  // forEach always returns undefined but we must still keep assigning that
  x = [1, 2, 3].forEach($);
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
  $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  const tmpLambdaForeachCounterHas$1 /*:boolean*/ = 1 in tmpMCOO;
  if (tmpLambdaForeachCounterHas$1) {
    const tmpLambdaForeachCounterVal$1 /*:primitive*/ = tmpMCOO[1];
    $dotCall($, undefined, undefined, tmpLambdaForeachCounterVal$1, 1, tmpMCOO);
  } else {
  }
  const tmpLambdaForeachCounterHas$2 /*:boolean*/ = 2 in tmpMCOO;
  if (tmpLambdaForeachCounterHas$2) {
    const tmpLambdaForeachCounterVal$2 /*:primitive*/ = tmpMCOO[2];
    $dotCall($, undefined, undefined, tmpLambdaForeachCounterVal$2, 2, tmpMCOO);
  } else {
  }
  x = undefined;
  $(undefined);
  return undefined;
};
let x /*:primitive*/ = 1;
f();
$(f);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpMCOO = [1, 2, 3];
  $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  if (1 in tmpMCOO) {
    $dotCall($, undefined, undefined, tmpMCOO[1], 1, tmpMCOO);
  }
  if (2 in tmpMCOO) {
    $dotCall($, undefined, undefined, tmpMCOO[2], 2, tmpMCOO);
  }
  x = undefined;
  $(undefined);
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
  }
  g = undefined;
  $( undefined );
  return undefined;
};
let g = 1;
a();
$( a );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCOO = [1, 2, 3];
  const tmpMCF = tmpMCOO.forEach;
  x = $dotCall(tmpMCF, tmpMCOO, `forEach`, $);
  $(x);
  return undefined;
};
let x = 1;
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 2, 1, [1, 2, 3]
 - 3: 3, 2, [1, 2, 3]
 - 4: undefined
 - 5: '<function>'
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
