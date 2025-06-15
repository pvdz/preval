# Preval test case

# assigned.md

> Array methods > Findlast > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  x = [1, 2, 3].findLast($);
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
  let tmpLambdaFindLastOut /*:unknown*/ /*ternaryConst*/ = undefined;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaFindLastNow /*:unknown*/ = $dotCall($, undefined, undefined, 3, 2, tmpMCOO);
  if (tmpLambdaFindLastNow) {
    tmpLambdaFindLastOut = 3;
  } else {
    let tmpClusterSSA_tmpLambdaFindLastCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaFindLastTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindLastCounter >= 0;
      if (tmpLambdaFindLastTest$1) {
        const tmpLambdaFindLastVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaFindLastCounter];
        const tmpLambdaFindLastNow$1 /*:unknown*/ = $dotCall(
          $,
          undefined,
          undefined,
          tmpLambdaFindLastVal$1,
          tmpClusterSSA_tmpLambdaFindLastCounter,
          tmpMCOO,
        );
        if (tmpLambdaFindLastNow$1) {
          tmpLambdaFindLastOut = tmpLambdaFindLastVal$1;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastCounter = tmpClusterSSA_tmpLambdaFindLastCounter - 1;
        }
      } else {
        break;
      }
    }
  }
  x = tmpLambdaFindLastOut;
  $(tmpLambdaFindLastOut);
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
  let tmpLambdaFindLastOut = undefined;
  const tmpMCOO = [1, 2, 3];
  if ($dotCall($, undefined, undefined, 3, 2, tmpMCOO)) {
    tmpLambdaFindLastOut = 3;
  } else {
    let tmpClusterSSA_tmpLambdaFindLastCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindLastCounter >= 0) {
        const tmpLambdaFindLastVal$1 = tmpMCOO[tmpClusterSSA_tmpLambdaFindLastCounter];
        if ($dotCall($, undefined, undefined, tmpLambdaFindLastVal$1, tmpClusterSSA_tmpLambdaFindLastCounter, tmpMCOO)) {
          tmpLambdaFindLastOut = tmpLambdaFindLastVal$1;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastCounter = tmpClusterSSA_tmpLambdaFindLastCounter - 1;
        }
      } else {
        break;
      }
    }
  }
  x = tmpLambdaFindLastOut;
  $(tmpLambdaFindLastOut);
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
  let b = undefined;
  const c = [ 1, 2, 3 ];
  const d = $dotCall( $, undefined, undefined, 3, 2, c );
  if (d) {
    b = 3;
  }
  else {
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e >= 0;
      if (f) {
        const g = c[ e ];
        const h = $dotCall( $, undefined, undefined, g, e, c );
        if (h) {
          b = g;
          break;
        }
        else {
          e = e - 1;
        }
      }
      else {
        break;
      }
    }
  }
  i = b;
  $( b );
  return undefined;
};
let i = 1;
a();
$( a );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCOO = [1, 2, 3];
  const tmpMCF = tmpMCOO.findLast;
  x = $dotCall(tmpMCF, tmpMCOO, `findLast`, $);
  $(x);
  return undefined;
};
let x = 1;
f();
$(f);
$(x);
`````


## Todos triggered


- (todo) Support this node type in isFree: DebuggerStatement
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findLast


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 2, [1, 2, 3]
 - 2: 3
 - 3: '<function>'
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
