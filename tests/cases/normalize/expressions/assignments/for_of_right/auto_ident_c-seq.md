# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > For of right > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Options

Known TDZ problem

- skipEval
- globals: x$1

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = $(x$1);
const tmpForOfGen /*:unknown*/ = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const a = $(x$1);
const tmpForOfGen = $forOf(a);
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf((a = ($(1), $(2), $(x$1))));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x$1 = tmpForOfNext.value;
    }
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x$1);
let tmpCalleeParam = a;
let tmpForOfGen = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x$2 = tmpForOfNext.value;
  }
}
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( x$1 );
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
  }
}
$( a, 1 );
`````

## Globals

None (except for the 1 globals expected by the test)

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
