# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > For of right > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x of (a = $($)($(1), $(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = $($);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
const a /*:unknown*/ = tmpCallCallee(tmpCalleeParam$1, tmpCalleeParam$3);
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
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = $($);
const a = tmpCallCallee($(1), $(2));
const tmpForOfGen = $forOf(a);
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
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
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
const e = $forOf( d );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = e.next();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    f.value;
  }
}
$( d );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
