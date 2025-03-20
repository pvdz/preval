# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident unary simple
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
for (let x in (a = typeof x));
$(a, x);
`````


## Settled


`````js filename=intro
const a /*:string*/ = typeof x$1;
const tmpForInGen /*:unknown*/ = $forIn(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = typeof x$1;
const tmpForInGen = $forIn(a);
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = typeof x$1;
const b = $forIn( a );
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


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
