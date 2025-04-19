# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = new ($($))(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const a /*:object*/ = new tmpNewCallee(1);
const tmpForOfGenNext /*:unknown*/ = $forOf(a);
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
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
const tmpForOfGenNext = $forOf(a);
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
const a = $( $ );
const b = new a( 1 );
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
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
