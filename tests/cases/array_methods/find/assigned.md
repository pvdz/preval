# Preval test case

# assigned.md

> Array methods > Find > Assigned
>
> Make sure assignment does not break

## Input

`````js filename=intro
let x = 1;
function f() {
  x = [1, 2, 3].find($);
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
  let tmpArreout /*:unknown*/ /*ternaryConst*/ = undefined;
  const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpArrnow /*:unknown*/ = $dotCall($, undefined, undefined, 1, 0, tmpMCOO);
  if (tmpArrnow) {
    tmpArreout = 1;
  } else {
    let tmpClusterSSA_tmpArri /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
      if (tmpArrc$1) {
        const tmpArrel$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpArri];
        const tmpArrnow$1 /*:unknown*/ = $dotCall($, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO);
        if (tmpArrnow$1) {
          tmpArreout = tmpArrel$1;
          break;
        } else {
          tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
        }
      } else {
        break;
      }
    }
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
  let tmpArreout = undefined;
  const tmpMCOO = [1, 2, 3];
  if ($dotCall($, undefined, undefined, 1, 0, tmpMCOO)) {
    tmpArreout = 1;
  } else {
    let tmpClusterSSA_tmpArri = 1;
    while (true) {
      if (tmpClusterSSA_tmpArri < 3) {
        const tmpArrel$1 = tmpMCOO[tmpClusterSSA_tmpArri];
        if ($dotCall($, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO)) {
          tmpArreout = tmpArrel$1;
          break;
        } else {
          tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
        }
      } else {
        break;
      }
    }
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
  let b = undefined;
  const c = [ 1, 2, 3 ];
  const d = $dotCall( $, undefined, undefined, 1, 0, c );
  if (d) {
    b = 1;
  }
  else {
    let e = 1;
    while ($LOOP_UNROLL_10) {
      const f = e < 3;
      if (f) {
        const g = c[ e ];
        const h = $dotCall( $, undefined, undefined, g, e, c );
        if (h) {
          b = g;
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
  const tmpMCF = tmpMCOO.find;
  x = $dotCall(tmpMCF, tmpMCOO, `find`, $);
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
- (todo) type trackeed tricks can possibly support static $array_find


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0, [1, 2, 3]
 - 2: 1
 - 3: '<function>'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
