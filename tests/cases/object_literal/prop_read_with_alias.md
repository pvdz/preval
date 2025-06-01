# Preval test case

# prop_read_with_alias.md

> Object literal > Prop read with alias
>
> Found through a test case generated through AI :D

This was the internal state when it happened. But it seems there's more to the internal state because this wasnn't it.

## Input

`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`v_init`);
const L /*:unknown*/ = $(`L1`);
const obj_orig /*:object*/ = { p: tmpObjLitVal };
loopStop:
{
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
  } else {}
}
const tmpCalleeParam /*:unknown*/ = obj_orig.p;
$(`use`, tmpCalleeParam);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`v_init`);
const L /*:unknown*/ = $(`L1`);
const obj_orig /*:object*/ = { p: tmpObjLitVal };
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
const L = $(`L1`);
const obj_orig = { p: tmpObjLitVal };
if (L) {
  $(`S_loop`);
  const tmpAssignMemRhs = $(`v_loop_assign`);
  obj_orig.p = tmpAssignMemRhs;
  const tmpIfTest = $(`C_break`);
  if (tmpIfTest) {
    const tmpAssignMemRhs$1 = $(`v_break_assign`);
    obj_orig.p = tmpAssignMemRhs$1;
  } else {
    let tmpClusterSSA_L = $(`L_next`);
    while ($LOOP_UNROLL_10) {
      if (tmpClusterSSA_L) {
        $(`S_loop`);
        const tmpAssignMemRhs$2 = $(`v_loop_assign`);
        obj_orig.p = tmpAssignMemRhs$2;
        const tmpIfTest$1 = $(`C_break`);
        if (tmpIfTest$1) {
          const tmpAssignMemRhs$4 = $(`v_break_assign`);
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
const tmpCalleeParam = obj_orig.p;
$(`use`, tmpCalleeParam);
`````


## Todos triggered


None


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
