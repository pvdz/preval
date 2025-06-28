# Preval test case

# for_each_unknown.md

> Promises > For each unknown
>
>

## Input

`````js filename=intro
async function f(x) {
  return $(x);
}
const arr = [$(1),$(2),$(3)];
$(arr.slice(0).forEach(f));
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$1 /*:unknown*/ = $(2);
const tmpArrElement$3 /*:unknown*/ = $(3);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpMCOO /*:array*/ /*truthy*/ = $dotCall($array_slice, arr, `slice`, 0);
const tmpLambdaForeachLen$1 /*:number*/ = tmpMCOO.length;
const tmpLambdaForeachCounterTest /*:boolean*/ = 0 < tmpLambdaForeachLen$1;
if (tmpLambdaForeachCounterTest) {
  const tmpLambdaForeachCounterHas /*:boolean*/ = 0 in tmpMCOO;
  if (tmpLambdaForeachCounterHas) {
    const x /*:unknown*/ = tmpMCOO[0];
    try {
      $(x);
    } catch (tmpRejectErr) {}
  } else {
  }
  let tmpClusterSSA_tmpLambdaForeachCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaForeachCounterTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaForeachCounter < tmpLambdaForeachLen$1;
    if (tmpLambdaForeachCounterTest$1) {
      const tmpLambdaForeachCounterHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaForeachCounter in tmpMCOO;
      if (tmpLambdaForeachCounterHas$1) {
        const x$1 /*:unknown*/ = tmpMCOO[tmpClusterSSA_tmpLambdaForeachCounter];
        try {
          $(x$1);
        } catch (tmpRejectErr$1) {}
      } else {
      }
      tmpClusterSSA_tmpLambdaForeachCounter = tmpClusterSSA_tmpLambdaForeachCounter + 1;
    } else {
      break;
    }
  }
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$1 = $(2);
const tmpArrElement$3 = $(3);
const tmpMCOO = $dotCall($array_slice, [tmpArrElement, tmpArrElement$1, tmpArrElement$3], `slice`, 0);
const tmpLambdaForeachLen$1 = tmpMCOO.length;
if (0 < tmpLambdaForeachLen$1) {
  if (0 in tmpMCOO) {
    const x = tmpMCOO[0];
    try {
      $(x);
    } catch (tmpRejectErr) {}
  }
  let tmpClusterSSA_tmpLambdaForeachCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaForeachCounter < tmpLambdaForeachLen$1) {
      if (tmpClusterSSA_tmpLambdaForeachCounter in tmpMCOO) {
        const x$1 = tmpMCOO[tmpClusterSSA_tmpLambdaForeachCounter];
        try {
          $(x$1);
        } catch (tmpRejectErr$1) {}
      }
      tmpClusterSSA_tmpLambdaForeachCounter = tmpClusterSSA_tmpLambdaForeachCounter + 1;
    } else {
      break;
    }
  }
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( 3 );
const d = [ a, b, c ];
const e = $dotCall( $array_slice, d, "slice", 0 );
const f = e.length;
const g = 0 < f;
if (g) {
  const h = 0 in e;
  if (h) {
    const i = e[ 0 ];
    try {
      $( i );
    }
    catch (j) {

    }
  }
  let k = 1;
  while ($LOOP_UNROLL_10) {
    const l = k < f;
    if (l) {
      const m = k in e;
      if (m) {
        const n = e[ k ];
        try {
          $( n );
        }
        catch (o) {

        }
      }
      k = k + 1;
    }
    else {
      break;
    }
  }
  $( undefined );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = async function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
const tmpArrElement = $(1);
const tmpArrElement$1 = $(2);
const tmpArrElement$3 = $(3);
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpMCF = arr.slice;
const tmpMCOO = $dotCall(tmpMCF, arr, `slice`, 0);
const tmpMCF$1 = tmpMCOO.forEach;
let tmpCalleeParam = $dotCall(tmpMCF$1, tmpMCOO, `forEach`, f);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_forEach
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) inline async functions safely (because await)
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Promise_reject
- (todo) type trackeed tricks can possibly support static $Promise_resolve
- (todo) type trackeed tricks can possibly support static $array_forEach
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) what last statement is not return? TryStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 1
 - 5: 2
 - 6: 3
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
