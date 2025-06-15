# Preval test case

# assigned.md

> Array methods > FindIndex > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  x = [1, 2, 3].findIndex($);
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
  let tmpLambdaFindIndexOut /*:unknown*/ /*ternaryConst*/ = -1;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaFindIndexNow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  if (tmpLambdaFindIndexNow) {
    tmpLambdaFindIndexOut = 0;
  } else {
    let tmpClusterSSA_tmpLambdaFindIndexCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaFindIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindIndexCounter < 3;
      if (tmpLambdaFindIndexTest$1) {
        const tmpLambdaFindIndexVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaFindIndexCounter];
        const tmpLambdaFindIndexNow$1 /*:unknown*/ = $dotCall(
          $,
          undefined,
          undefined,
          tmpLambdaFindIndexVal$1,
          tmpClusterSSA_tmpLambdaFindIndexCounter,
          tmpMCOO,
        );
        if (tmpLambdaFindIndexNow$1) {
          tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
        }
      } else {
        break;
      }
    }
  }
  x = tmpLambdaFindIndexOut;
  $(tmpLambdaFindIndexOut);
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
  let tmpLambdaFindIndexOut = -1;
  const tmpMCOO = [1, 2, 3];
  if ($dotCall($, undefined, undefined, 1, 0, tmpMCOO)) {
    tmpLambdaFindIndexOut = 0;
  } else {
    let tmpClusterSSA_tmpLambdaFindIndexCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindIndexCounter < 3) {
        if (
          $dotCall(
            $,
            undefined,
            undefined,
            tmpMCOO[tmpClusterSSA_tmpLambdaFindIndexCounter],
            tmpClusterSSA_tmpLambdaFindIndexCounter,
            tmpMCOO,
          )
        ) {
          tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
        }
      } else {
        break;
      }
    }
  }
  x = tmpLambdaFindIndexOut;
  $(tmpLambdaFindIndexOut);
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
  let b = -1;
  const c = [ 1, 2, 3 ];
  const d = $dotCall( $, undefined, undefined, 1, 0, c );
  if (d) {
    b = 0;
  }
  else {
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e < 3;
      if (f) {
        const g = c[ e ];
        const h = $dotCall( $, undefined, undefined, g, e, c );
        if (h) {
          b = e;
          break;
        }
        else {
          e = e + 1;
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
  const tmpMCF = tmpMCOO.findIndex;
  x = $dotCall(tmpMCF, tmpMCOO, `findIndex`, $);
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
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 0
 - 3: '<function>'
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
