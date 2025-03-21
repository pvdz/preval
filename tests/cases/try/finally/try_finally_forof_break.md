# Preval test case

# try_finally_forof_break.md

> Try > Finally > Try finally forof break
>
> Finally transform checks

## Input

`````js filename=intro
for (const x of ['a', 'b', 'c']) {
  try {
    $(x, 1);
  } finally {
    $(2);
    break;
  }
}
$(3);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`a`, `b`, `c`];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
    break;
  }
}
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf([`a`, `b`, `c`]);
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const x = tmpForOfNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
    break;
  }
}
$(3);
`````

## Pre Normal


`````js filename=intro
{
  let tmpForOfGen = $forOf([`a`, `b`, `c`]);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      const x = tmpForOfNext.value;
      {
        {
          let $implicitThrow = false;
          let $finalCatchArg = undefined;
          $finally: {
            try {
              $(x, 1);
            } catch ($finalImplicit) {
              $implicitThrow = true;
              $finalCatchArg = $finalImplicit;
            }
          }
          {
            $(2);
            break;
          }
          if ($implicitThrow) throw $finalCatchArg;
          else {
          }
        }
      }
    }
  }
}
$(3);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [`a`, `b`, `c`];
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x = tmpForOfNext.value;
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    try {
      $(x, 1);
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
    $(2);
    break;
  }
}
$(3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    try {
      $( e, 1 );
    }
    catch (f) {

    }
    $( 2 );
    break;
  }
}
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a', 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
