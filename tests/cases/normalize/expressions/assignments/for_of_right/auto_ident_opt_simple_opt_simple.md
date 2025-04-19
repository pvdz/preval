# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident opt simple opt simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (let x of (a = b?.x?.y));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpForOfGenNext /*:unknown*/ = $forOf(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpClusterSSA_tmpForOfGenNext();
  const tmpIfTest$3 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$3) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpForOfGenNext = $forOf(1);
while (true) {
  const tmpForOfNext = tmpClusterSSA_tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $forOf( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a();
  const c = b.done;
  if (c) {
    break;
  }
  else {
    b.value;
  }
}
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
