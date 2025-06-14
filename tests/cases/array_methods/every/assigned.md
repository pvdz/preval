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
  let tmpArreout /*:boolean*/ /*ternaryConst*/ = true;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpArrenow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  if (tmpArrenow) {
    let tmpClusterSSA_tmpArri /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
      if (tmpArrc$1) {
        const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in tmpMCOO;
        if (tmpArrin$1) {
          const tmpArrel$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpArri];
          const tmpArrenow$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO);
          if (tmpArrenow$1) {
          } else {
            tmpArreout = false;
            break;
          }
        } else {
        }
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
      } else {
        break;
      }
    }
  } else {
    tmpArreout = false;
  }
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
  let tmpArreout = true;
  const tmpMCOO = [1, 2, 3];
  if ($dotCall($, undefined, undefined, 1, 0, tmpMCOO)) {
    let tmpClusterSSA_tmpArri = 1;
    while (true) {
      if (tmpClusterSSA_tmpArri < 3) {
        if (tmpClusterSSA_tmpArri in tmpMCOO) {
          if (!$dotCall($, undefined, undefined, tmpMCOO[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, tmpMCOO)) {
            tmpArreout = false;
            break;
          }
        }
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
      } else {
        break;
      }
    }
  } else {
    tmpArreout = false;
  }
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
 - 4: true
 - 5: '<function>'
 - 6: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
