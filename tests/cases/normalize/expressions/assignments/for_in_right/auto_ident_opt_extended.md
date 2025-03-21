# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > For in right > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
for (let x in (a = b?.x.y.z));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpForInGen /*:unknown*/ = $forIn(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpClusterSSA_tmpForInGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpForInGen = $forIn(100);
while (true) {
  const tmpForInNext = tmpClusterSSA_tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $forIn( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a.next();
  const c = b.done;
  if (c) {
    break;
  }
  else {
    b.value;
  }
}
$( 100 );
`````


## Todos triggered


- (todo) Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
- (todo) Calling a static method on an ident that is not global and not recorded: $tmpClusterSSA_tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
