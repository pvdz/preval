# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > For of right > Auto ident s-seq
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
for (let x of (a = ($(1), $(2), x)));
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = x$1;
const tmpForOfGenNext /*:unknown*/ = $forOf(x$1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
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
const a = x$1;
const tmpForOfGenNext = $forOf(x$1);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = x$1;
const b = $forOf( x$1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
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


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
