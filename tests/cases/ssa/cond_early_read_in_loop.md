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
const tmpForInGen /*:unknown*/ = $forIn(rhs);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
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
const tmpForInGen = $forIn(rhs);
while (true) {
  const tmpForInNext = tmpForInGen.next();
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

## Pre Normal


`````js filename=intro
let lhs = undefined;
{
  let tmpForInGen = $forIn(rhs);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      lhs = tmpForInNext.value;
      {
        if ($) {
          const rhs$1 = [$throwTDZError(`Preval: TDZ triggered for this read: [firstElement]`)];
          $(rhs$1);
        } else {
          $(`init`);
        }
        let firstElement = undefined;
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
let lhs = undefined;
let tmpForInGen = $forIn(rhs);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
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

## PST Settled
With rename=true

`````js filename=intro
const a = $forIn( rhs );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a.next();
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

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
