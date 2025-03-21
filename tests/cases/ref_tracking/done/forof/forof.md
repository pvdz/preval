# Preval test case

# forof.md

> Ref tracking > Done > Forof > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
for (let x of [10, 20]) {
  $('fail');
}
$('keep, do not eval');
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [10, 20];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
    $(`fail`);
  }
}
$(`keep, do not eval`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf([10, 20]);
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
    $(`fail`);
  }
}
$(`keep, do not eval`);
`````

## Pre Normal


`````js filename=intro
{
  let tmpForOfGen = $forOf([10, 20]);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x = tmpForOfNext.value;
      {
        $(`fail`);
      }
    }
  }
}
$(`keep, do not eval`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [10, 20];
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x = tmpForOfNext.value;
    $(`fail`);
  }
}
$(`keep, do not eval`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20 ];
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
    $( "fail" );
  }
}
$( "keep, do not eval" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'fail'
 - 2: 'fail'
 - 3: 'keep, do not eval'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
