# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = void $(100)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpForInGen /*:unknown*/ = $forIn(undefined);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpForInGen = $forIn(undefined);
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $forIn( undefined );
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
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
