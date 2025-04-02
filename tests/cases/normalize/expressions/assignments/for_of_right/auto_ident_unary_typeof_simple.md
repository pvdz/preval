# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = typeof arg));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpForOfGen /*:unknown*/ = $forOf(`number`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf(`number`);
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $forOf( "number" );
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
$( "number", 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
