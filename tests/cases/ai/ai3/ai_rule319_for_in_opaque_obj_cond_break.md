# Preval test case

# ai_rule319_for_in_opaque_obj_cond_break.md

> Ai > Ai3 > Ai rule319 for in opaque obj cond break
>
> Test: for...in loop over opaque object, conditional break on opaque value.

## Input

`````js filename=intro
// Expected: let obj = $('get_obj'); for (let k in obj) { $('key', k); if ($('break_cond', k)) break; $('after_break_check', k); } $('done');
let obj = $('get_obj');
for (let k in obj) {
  $('key', k);
  if ($('break_cond', k)) {
    break;
  }
  $('after_break_check', k);
}
$('done');
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`get_obj`);
const tmpForInGen /*:unknown*/ = $forIn(obj);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const k /*:unknown*/ = tmpForInNext.value;
    $(`key`, k);
    const tmpIfTest$1 /*:unknown*/ = $(`break_cond`, k);
    if (tmpIfTest$1) {
      break;
    } else {
      $(`after_break_check`, k);
    }
  }
}
$(`done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn($(`get_obj`));
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const k = tmpForInNext.value;
    $(`key`, k);
    if ($(`break_cond`, k)) {
      break;
    } else {
      $(`after_break_check`, k);
    }
  }
}
$(`done`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_obj" );
const b = $forIn( a );
while ($LOOP_NO_UNROLLS_LEFT) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    $( "key", e );
    const f = $( "break_cond", e );
    if (f) {
      break;
    }
    else {
      $( "after_break_check", e );
    }
  }
}
$( "done" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = $(`get_obj`);
const tmpForInGen = $forIn(obj);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let k = tmpForInNext.value;
    $(`key`, k);
    const tmpIfTest$1 = $(`break_cond`, k);
    if (tmpIfTest$1) {
      break;
    } else {
      $(`after_break_check`, k);
    }
  }
}
$(`done`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_obj'
 - 2: 'key', '0'
 - 3: 'break_cond', '0'
 - 4: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
