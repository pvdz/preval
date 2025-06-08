# Preval test case

# ai_obj_alias_prop_loop_modify.md

> Tofix > ai obj alias prop loop modify
>
> Test: Object property modified via aliased reference in a loop, used after loop.

## Input

`````js filename=intro
// Expected: (Complex. obj_orig.p should reflect changes made via alias.p)
let obj_orig = { p: $('v_init') };
let alias = obj_orig;
let L = $('L1');
while (L) {
  $('S_loop');
  alias.p = $('v_loop_assign');
  if ($('C_break')) {
    alias.p = $('v_break_assign');
    break;
  }
  L = $('L_next');
}
$('use', obj_orig.p);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`v_init`);
const L /*:unknown*/ = $(`L1`);
const obj_orig /*:object*/ /*truthy*/ = { p: tmpObjLitVal };
if (L) {
  $(`S_loop`);
  const tmpAssignMemRhs /*:unknown*/ = $(`v_loop_assign`);
  obj_orig.p = tmpAssignMemRhs;
  const tmpIfTest /*:unknown*/ = $(`C_break`);
  if (tmpIfTest) {
    const tmpAssignMemRhs$1 /*:unknown*/ = $(`v_break_assign`);
    obj_orig.p = tmpAssignMemRhs$1;
  } else {
    let tmpClusterSSA_L /*:unknown*/ = $(`L_next`);
    while ($LOOP_UNROLL_10) {
      if (tmpClusterSSA_L) {
        $(`S_loop`);
        const tmpAssignMemRhs$2 /*:unknown*/ = $(`v_loop_assign`);
        obj_orig.p = tmpAssignMemRhs$2;
        const tmpIfTest$1 /*:unknown*/ = $(`C_break`);
        if (tmpIfTest$1) {
          const tmpAssignMemRhs$4 /*:unknown*/ = $(`v_break_assign`);
          obj_orig.p = tmpAssignMemRhs$4;
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
const tmpCalleeParam /*:unknown*/ = obj_orig.p;
$(`use`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(`v_init`);
const L = $(`L1`);
const obj_orig = { p: tmpObjLitVal };
if (L) {
  $(`S_loop`);
  obj_orig.p = $(`v_loop_assign`);
  if ($(`C_break`)) {
    obj_orig.p = $(`v_break_assign`);
  } else {
    let tmpClusterSSA_L = $(`L_next`);
    while (true) {
      if (tmpClusterSSA_L) {
        $(`S_loop`);
        obj_orig.p = $(`v_loop_assign`);
        if ($(`C_break`)) {
          obj_orig.p = $(`v_break_assign`);
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
$(`use`, obj_orig.p);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "v_init" );
const b = $( "L1" );
const c = { p: a };
if (b) {
  $( "S_loop" );
  const d = $( "v_loop_assign" );
  c.p = d;
  const e = $( "C_break" );
  if (e) {
    const f = $( "v_break_assign" );
    c.p = f;
  }
  else {
    let g = $( "L_next" );
    while ($LOOP_UNROLL_10) {
      if (g) {
        $( "S_loop" );
        const h = $( "v_loop_assign" );
        c.p = h;
        const i = $( "C_break" );
        if (i) {
          const j = $( "v_break_assign" );
          c.p = j;
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
const k = c.p;
$( "use", k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`v_init`);
let obj_orig = { p: tmpObjLitVal };
let alias = obj_orig;
let L = $(`L1`);
while (true) {
  if (L) {
    $(`S_loop`);
    const tmpAssignMemLhsObj = alias;
    const tmpAssignMemRhs = $(`v_loop_assign`);
    tmpAssignMemLhsObj.p = tmpAssignMemRhs;
    const tmpIfTest = $(`C_break`);
    if (tmpIfTest) {
      const tmpAssignMemLhsObj$1 = alias;
      const tmpAssignMemRhs$1 = $(`v_break_assign`);
      tmpAssignMemLhsObj$1.p = tmpAssignMemRhs$1;
      break;
    } else {
      L = $(`L_next`);
    }
  } else {
    break;
  }
}
let tmpCalleeParam = obj_orig.p;
$(`use`, tmpCalleeParam);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'v_init'
 - 2: 'L1'
 - 3: 'S_loop'
 - 4: 'v_loop_assign'
 - 5: 'C_break'
 - 6: 'v_break_assign'
 - 7: 'use', 'v_break_assign'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
