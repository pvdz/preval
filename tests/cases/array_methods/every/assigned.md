# Preval test case

# assigned.md

> Array methods > Every > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  x = [1, 2, 3].every($);
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
  let tmpLambdaEveryOut /*:boolean*/ /*ternaryConst*/ = true;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaEveryWas /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  if (tmpLambdaEveryWas) {
    let tmpClusterSSA_tmpLambdaEveryCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaEveryTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter < 3;
      if (tmpLambdaEveryTest$1) {
        const tmpLambdaEveryHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter in tmpMCOO;
        if (tmpLambdaEveryHas$1) {
          const tmpLambdaEveryVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaEveryCounter];
          const tmpLambdaEveryWas$1 /*:unknown*/ = $dotCall(
            $,
            undefined,
            undefined,
            tmpLambdaEveryVal$1,
            tmpClusterSSA_tmpLambdaEveryCounter,
            tmpMCOO,
          );
          if (tmpLambdaEveryWas$1) {
          } else {
            tmpLambdaEveryOut = false;
            break;
          }
        } else {
        }
        tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
      } else {
        break;
      }
    }
  } else {
    tmpLambdaEveryOut = false;
  }
  x = tmpLambdaEveryOut;
  $(tmpLambdaEveryOut);
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
  let tmpLambdaEveryOut = true;
  const tmpMCOO = [1, 2, 3];
  if ($dotCall($, undefined, undefined, 1, 0, tmpMCOO)) {
    let tmpClusterSSA_tmpLambdaEveryCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaEveryCounter < 3) {
        if (tmpClusterSSA_tmpLambdaEveryCounter in tmpMCOO) {
          if (
            !$dotCall($, undefined, undefined, tmpMCOO[tmpClusterSSA_tmpLambdaEveryCounter], tmpClusterSSA_tmpLambdaEveryCounter, tmpMCOO)
          ) {
            tmpLambdaEveryOut = false;
            break;
          }
        }
        tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
      } else {
        break;
      }
    }
  } else {
    tmpLambdaEveryOut = false;
  }
  x = tmpLambdaEveryOut;
  $(tmpLambdaEveryOut);
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
  let b = true;
  const c = [ 1, 2, 3 ];
  const d = $dotCall( $, undefined, undefined, 1, 0, c );
  if (d) {
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e < 3;
      if (f) {
        const g = e in c;
        if (g) {
          const h = c[ e ];
          const i = $dotCall( $, undefined, undefined, h, e, c );
          if (i) {

          }
          else {
            b = false;
            break;
          }
        }
        e = e + 1;
      }
      else {
        break;
      }
    }
  }
  else {
    b = false;
  }
  j = b;
  $( b );
  return undefined;
};
let j = 1;
a();
$( a );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCOO = [1, 2, 3];
  const tmpMCF = tmpMCOO.every;
  x = $dotCall(tmpMCF, tmpMCOO, `every`, $);
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
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 2, 1, [1, 2, 3]
 - 3: 3, 2, [1, 2, 3]
 - 4: true
 - 5: '<function>'
 - 6: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
