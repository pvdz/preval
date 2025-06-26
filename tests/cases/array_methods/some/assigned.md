# Preval test case

# assigned.md

> Array methods > Some > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  x = [1, 2, 3].some($);
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
  let tmpLambdaSomeOut /*:boolean*/ /*ternaryConst*/ = false;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpLambdaSomeNow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  if (tmpLambdaSomeNow) {
    tmpLambdaSomeOut = true;
  } else {
    let tmpClusterSSA_tmpLambdaSomeCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaSomeTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaSomeCounter < 3;
      if (tmpLambdaSomeTest$1) {
        const tmpLambdaSomeHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaSomeCounter in tmpMCOO;
        if (tmpLambdaSomeHas$1) {
          const tmpLambdaSomeVal$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpLambdaSomeCounter];
          const tmpLambdaSomeNow$1 /*:unknown*/ = $dotCall(
            $,
            undefined,
            undefined,
            tmpLambdaSomeVal$1,
            tmpClusterSSA_tmpLambdaSomeCounter,
            tmpMCOO,
          );
          if (tmpLambdaSomeNow$1) {
            tmpLambdaSomeOut = true;
            break;
          } else {
          }
        } else {
        }
        tmpClusterSSA_tmpLambdaSomeCounter = tmpClusterSSA_tmpLambdaSomeCounter + 1;
      } else {
        break;
      }
    }
  }
  x = tmpLambdaSomeOut;
  $(tmpLambdaSomeOut);
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
  let tmpLambdaSomeOut = false;
  const tmpMCOO = [1, 2, 3];
  if ($dotCall($, undefined, undefined, 1, 0, tmpMCOO)) {
    tmpLambdaSomeOut = true;
  } else {
    let tmpClusterSSA_tmpLambdaSomeCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaSomeCounter < 3) {
        if (tmpClusterSSA_tmpLambdaSomeCounter in tmpMCOO) {
          if ($dotCall($, undefined, undefined, tmpMCOO[tmpClusterSSA_tmpLambdaSomeCounter], tmpClusterSSA_tmpLambdaSomeCounter, tmpMCOO)) {
            tmpLambdaSomeOut = true;
            break;
          }
        }
        tmpClusterSSA_tmpLambdaSomeCounter = tmpClusterSSA_tmpLambdaSomeCounter + 1;
      } else {
        break;
      }
    }
  }
  x = tmpLambdaSomeOut;
  $(tmpLambdaSomeOut);
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
  let b = false;
  const c = [ 1, 2, 3 ];
  const d = $dotCall( $, undefined, undefined, 1, 0, c );
  if (d) {
    b = true;
  }
  else {
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e < 3;
      if (f) {
        const g = e in c;
        if (g) {
          const h = c[ e ];
          const i = $dotCall( $, undefined, undefined, h, e, c );
          if (i) {
            b = true;
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
  const tmpMCF = tmpMCOO.some;
  x = $dotCall(tmpMCF, tmpMCOO, `some`, $);
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
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: true
 - 3: '<function>'
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
