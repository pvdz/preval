# Preval test case

# reg_seq_simple_computed_complex1.md

> Normalize > Expressions > Assignments > For of right > Reg seq simple computed complex1
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
for (let x of $([]));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGenNext = $forOf($([]));
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    d.value;
  }
}
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
