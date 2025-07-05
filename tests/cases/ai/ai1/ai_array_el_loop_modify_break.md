# Preval test case

# ai_array_el_loop_modify_break.md

> Ai > Ai1 > Ai array el loop modify break
>
> Test: Array element modified in loop with conditional break, used after loop.

## Input

`````js filename=intro
// Expected: (Complex loop unrolling, semantic preservation of arr[0])
let arr = [$('val_init')];
let L = $('L1');
while (L) {
  $('S_loop');
  arr[0] = $('val_loop');
  if ($('C_break')) {
    arr[0] = $('val_break');
    break;
  }
  L = $('L_next');
}
$('use', arr[0]);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`val_init`);
const L /*:unknown*/ = $(`L1`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement];
if (L) {
  $(`S_loop`);
  const tmpAssignComputedRhs /*:unknown*/ = $(`val_loop`);
  arr[0] = tmpAssignComputedRhs;
  const tmpIfTest /*:unknown*/ = $(`C_break`);
  if (tmpIfTest) {
    const tmpAssignComputedRhs$1 /*:unknown*/ = $(`val_break`);
    arr[0] = tmpAssignComputedRhs$1;
  } else {
    let tmpClusterSSA_L /*:unknown*/ = $(`L_next`);
    while ($LOOP_UNROLLS_LEFT_10) {
      if (tmpClusterSSA_L) {
        $(`S_loop`);
        const tmpAssignComputedRhs$2 /*:unknown*/ = $(`val_loop`);
        arr[0] = tmpAssignComputedRhs$2;
        const tmpIfTest$1 /*:unknown*/ = $(`C_break`);
        if (tmpIfTest$1) {
          const tmpAssignComputedRhs$4 /*:unknown*/ = $(`val_break`);
          arr[0] = tmpAssignComputedRhs$4;
          break;
        } else {
          tmpClusterSSA_L = $(`L_next`);
        }
      } else {
        break;
      }
    }
  }
} else {
}
const tmpCalleeParam /*:unknown*/ = arr[0];
$(`use`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`val_init`);
const L = $(`L1`);
const arr = [tmpArrElement];
if (L) {
  $(`S_loop`);
  const tmpAssignComputedRhs = $(`val_loop`);
  arr[0] = tmpAssignComputedRhs;
  if ($(`C_break`)) {
    const tmpAssignComputedRhs$1 = $(`val_break`);
    arr[0] = tmpAssignComputedRhs$1;
  } else {
    let tmpClusterSSA_L = $(`L_next`);
    while (true) {
      if (tmpClusterSSA_L) {
        $(`S_loop`);
        const tmpAssignComputedRhs$2 = $(`val_loop`);
        arr[0] = tmpAssignComputedRhs$2;
        if ($(`C_break`)) {
          const tmpAssignComputedRhs$4 = $(`val_break`);
          arr[0] = tmpAssignComputedRhs$4;
          break;
        } else {
          tmpClusterSSA_L = $(`L_next`);
        }
      } else {
        break;
      }
    }
  }
}
$(`use`, arr[0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val_init" );
const b = $( "L1" );
const c = [ a ];
if (b) {
  $( "S_loop" );
  const d = $( "val_loop" );
  c[0] = d;
  const e = $( "C_break" );
  if (e) {
    const f = $( "val_break" );
    c[0] = f;
  }
  else {
    let g = $( "L_next" );
    while ($LOOP_UNROLLS_LEFT_10) {
      if (g) {
        $( "S_loop" );
        const h = $( "val_loop" );
        c[0] = h;
        const i = $( "C_break" );
        if (i) {
          const j = $( "val_break" );
          c[0] = j;
          break;
        }
        else {
          g = $( "L_next" );
        }
      }
      else {
        break;
      }
    }
  }
}
const k = c[ 0 ];
$( "use", k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`val_init`);
let arr = [tmpArrElement];
let L = $(`L1`);
while (true) {
  if (L) {
    $(`S_loop`);
    const tmpAssignComputedObj = arr;
    const tmpAssignComputedProp = 0;
    const tmpAssignComputedRhs = $(`val_loop`);
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    const tmpIfTest = $(`C_break`);
    if (tmpIfTest) {
      const tmpAssignComputedObj$1 = arr;
      const tmpAssignComputedProp$1 = 0;
      const tmpAssignComputedRhs$1 = $(`val_break`);
      tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
      break;
    } else {
      L = $(`L_next`);
    }
  } else {
    break;
  }
}
let tmpCalleeParam = arr[0];
$(`use`, tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val_init'
 - 2: 'L1'
 - 3: 'S_loop'
 - 4: 'val_loop'
 - 5: 'C_break'
 - 6: 'val_break'
 - 7: 'use', 'val_break'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
