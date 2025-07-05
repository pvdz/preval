# Preval test case

# cond_early_read_in_loop.md

> Ssa > Cond early read in loop
>
> Early read in loop can skirt TDZ when conditional

## Input

`````js filename=intro
let lhs = undefined;
for (lhs in rhs) {
  if ($) {
    const rhs = [firstElement];
    $(rhs);
  } else {
    $('init');
  }
  let firstElement = undefined;
}
`````


## Settled


`````js filename=intro
const tmpForInGenNext /*:unknown*/ = $forIn(rhs);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
    if ($) {
      throw `Preval: TDZ triggered for this read: [firstElement]`;
    } else {
      $(`init`);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGenNext = $forIn(rhs);
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
    if ($) {
      throw `Preval: TDZ triggered for this read: [firstElement]`;
    } else {
      $(`init`);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $forIn( rhs );
while ($LOOP_NO_UNROLLS_LEFT) {
  const b = a();
  const c = b.done;
  if (c) {
    break;
  }
  else {
    b.value;
    if ($) {
      throw "Preval: TDZ triggered for this read: [firstElement]";
    }
    else {
      $( "init" );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let lhs = undefined;
const tmpForInGenNext = $forIn(rhs);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext = tmpForInGenNext();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    lhs = tmpForInNext.value;
    if ($) {
      throw `Preval: TDZ triggered for this read: [firstElement]`;
      const rhs$1 = 0;
    } else {
      $(`init`);
      let firstElement = undefined;
    }
  }
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

rhs


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
