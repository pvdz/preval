# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = (10, 20, 30) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
const tmpForOfGen /*:unknown*/ = $forOf(60);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(60);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf(60);
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(60);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf((a = (10, 20, 30) ? (40, 50, 60) : $($(100))));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x = tmpForOfNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
let tmpForOfGen = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest$1 = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    let x = tmpForOfNext.value;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $forOf( 60 );
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
$( 60 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next