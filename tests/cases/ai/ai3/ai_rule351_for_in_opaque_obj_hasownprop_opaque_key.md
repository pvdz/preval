# Preval test case

# ai_rule351_for_in_opaque_obj_hasownprop_opaque_key.md

> Ai > Ai3 > Ai rule351 for in opaque obj hasownprop opaque key
>
> Test: for...in on opaque object, body uses obj.hasOwnProperty(opaque_key).

## Input

`````js filename=intro
// Expected: let o = $('getO')(); for (let k in o) { if (o.hasOwnProperty($('k', k))) $('own', k); }
let obj = $('getObject'); // Assume getObject returns an actual object for the test runner
for (let key in obj) {
  $('loop_key', key);
  // Pass the key itself to hasOwnProperty, but also log an opaque version of it
  if (obj.hasOwnProperty(key)) {
    $('is_own_property', key, $('opaque_key_version', key));
  } else {
    $('is_not_own_property', key);
  }
}
$('done_loop');
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`getObject`);
const tmpForInGen /*:unknown*/ = $forIn(obj);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key /*:unknown*/ = tmpForInNext.value;
    $(`loop_key`, key);
    const tmpMCF /*:unknown*/ = obj.hasOwnProperty;
    const tmpIfTest$1 /*:unknown*/ = $dotCall(tmpMCF, obj, `hasOwnProperty`, key);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:unknown*/ = $(`opaque_key_version`, key);
      $(`is_own_property`, key, tmpCalleeParam$1);
    } else {
      $(`is_not_own_property`, key);
    }
  }
}
$(`done_loop`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`getObject`);
const tmpForInGen = $forIn(obj);
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const key = tmpForInNext.value;
    $(`loop_key`, key);
    if (obj.hasOwnProperty(key)) {
      $(`is_own_property`, key, $(`opaque_key_version`, key));
    } else {
      $(`is_not_own_property`, key);
    }
  }
}
$(`done_loop`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "getObject" );
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    $( "loop_key", e );
    const f = a.hasOwnProperty;
    const g = $dotCall( f, a, "hasOwnProperty", e );
    if (g) {
      const h = $( "opaque_key_version", e );
      $( "is_own_property", e, h );
    }
    else {
      $( "is_not_own_property", e );
    }
  }
}
$( "done_loop" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = $(`getObject`);
const tmpForInGen = $forIn(obj);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let key = tmpForInNext.value;
    $(`loop_key`, key);
    const tmpMCF = obj.hasOwnProperty;
    const tmpIfTest$1 = $dotCall(tmpMCF, obj, `hasOwnProperty`, key);
    if (tmpIfTest$1) {
      let tmpCalleeParam = key;
      let tmpCalleeParam$1 = $(`opaque_key_version`, key);
      $(`is_own_property`, tmpCalleeParam, tmpCalleeParam$1);
    } else {
      $(`is_not_own_property`, key);
    }
  }
}
$(`done_loop`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'getObject'
 - 2: 'loop_key', '0'
 - 3: 'opaque_key_version', '0'
 - 4: 'is_own_property', '0', 'opaque_key_version'
 - 5: 'loop_key', '1'
 - 6: 'opaque_key_version', '1'
 - 7: 'is_own_property', '1', 'opaque_key_version'
 - 8: 'loop_key', '2'
 - 9: 'opaque_key_version', '2'
 - 10: 'is_own_property', '2', 'opaque_key_version'
 - 11: 'loop_key', '3'
 - 12: 'opaque_key_version', '3'
 - 13: 'is_own_property', '3', 'opaque_key_version'
 - 14: 'loop_key', '4'
 - 15: 'opaque_key_version', '4'
 - 16: 'is_own_property', '4', 'opaque_key_version'
 - 17: 'loop_key', '5'
 - 18: 'opaque_key_version', '5'
 - 19: 'is_own_property', '5', 'opaque_key_version'
 - 20: 'loop_key', '6'
 - 21: 'opaque_key_version', '6'
 - 22: 'is_own_property', '6', 'opaque_key_version'
 - 23: 'loop_key', '7'
 - 24: 'opaque_key_version', '7'
 - 25: 'is_own_property', '7', 'opaque_key_version'
 - 26: 'loop_key', '8'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
