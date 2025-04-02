# Preval test case

# try_finally_forof_continue.md

> Try > Finally > Try finally forof continue
>
> Finally transform checks

## Input

`````js filename=intro
for (const x of ['a', 'b', 'c']) {
  try {
    $(x, 1);
  } finally {
    $(2);
    continue;
  }
}
$(3);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`a`, `b`, `c`];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
  }
}
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf([`a`, `b`, `c`]);
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const x = tmpForOfNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
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
  const c = b();
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
  }
}
$( 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a', 1
 - 2: 2
 - 3: 'b', 1
 - 4: 2
 - 5: 'c', 1
 - 6: 2
 - 7: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
