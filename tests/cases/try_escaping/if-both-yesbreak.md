# Preval test case

# if-both-yesbreak.md

> Try escaping > If-both-yesbreak
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let x = $(1);
  try {
    if (x) break;
    else x = 2;
    $(arr[0]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x /*:unknown*/ = $(1);
  if (x) {
    break;
  } else {
    const tmpCalleeParam /*:primitive*/ = arr[0];
    try {
      $(tmpCalleeParam);
      arr.reverse();
    } catch (e) {
      $(`fail`);
    }
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
while (true) {
  if ($(1)) {
    break;
  } else {
    const tmpCalleeParam = arr[0];
    try {
      $(tmpCalleeParam);
      arr.reverse();
    } catch (e) {
      $(`fail`);
    }
  }
}
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let x = $(1);
  try {
    if (x) break;
    else x = 2;
    $(arr[0]);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let x = $(1);
  try {
    if (x) {
      break;
    } else {
      x = 2;
      const tmpCalleeParam = arr[0];
      $(tmpCalleeParam);
      arr.reverse();
    }
  } catch (e) {
    $(`fail`);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( 1 );
  if (b) {
    break;
  }
  else {
    const c = a[ 0 ];
    try {
      $( c );
      a.reverse();
    }
    catch (d) {
      $( "fail" );
    }
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
