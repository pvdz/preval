# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > For of right > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = arguments));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
const tmpForOfGenNext /*:unknown*/ = $forOf(arguments);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
const tmpForOfGenNext = $forOf(arguments);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
const b = $forOf( arguments );
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
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
