# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = void $(100)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpForOfGen /*:unknown*/ = $forOf(undefined);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpForOfGen = $forOf(undefined);
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $forOf( undefined );
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
