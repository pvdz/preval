# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = $($(1)) && 2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpForOfGenNext /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  a = 2;
  tmpForOfGenNext = $forOf(2);
} else {
  tmpForOfGenNext = $forOf(a);
}
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
let a = $($(1));
let tmpForOfGenNext = undefined;
if (a) {
  a = 2;
  tmpForOfGenNext = $forOf(2);
} else {
  tmpForOfGenNext = $forOf(a);
}
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
const a = $( 1 );
let b = $( a );
let c = undefined;
if (b) {
  b = 2;
  c = $forOf( 2 );
}
else {
  c = $forOf( b );
}
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
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
