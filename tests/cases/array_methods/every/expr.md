# Preval test case

# expr.md

> Array methods > Every > Expr
>
> The case where the result is not stored/used

## Input

`````js filename=intro
function f() {
  const arr = [1, 2, 3];
  arr.every($);
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
  if (tmpArrenow) {
    let tmpClusterSSA_tmpArri /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
      if (tmpArrc$1) {
        const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in arr;
        if (tmpArrin$1) {
          const tmpArrel$1 /*:primitive*/ = arr[tmpClusterSSA_tmpArri];
          const tmpArrenow$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, arr);
          if (tmpArrenow$1) {
          } else {
            break;
          }
        } else {
        }
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
      } else {
        break;
      }
    }
    return undefined;
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
  if ($dotCall($, undefined, undefined, 1, 0, arr)) {
    let tmpClusterSSA_tmpArri = 1;
    while (true) {
      if (tmpClusterSSA_tmpArri < 3) {
        if (tmpClusterSSA_tmpArri in arr) {
          if (!$dotCall($, undefined, undefined, arr[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, arr)) {
            break;
          }
        }
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
      } else {
        break;
      }
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
  if (c) {
    let d = 1;
    while ($LOOP_UNROLL_10) {
      const e = d < 3;
      if (e) {
        const f = d in b;
        if (f) {
          const g = b[ d ];
          const h = $dotCall( $, undefined, undefined, g, d, b );
          if (h) {

          }
          else {
            break;
          }
        }
        d = d + 1;
      }
      else {
        break;
      }
    }
    return undefined;
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
  const tmpMCF = arr.every;
  $dotCall(tmpMCF, arr, `every`, $);
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
- (todo) type trackeed tricks can possibly support static $array_every


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
