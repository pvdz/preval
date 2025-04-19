# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(1);
let tmpForOfGenNext /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf(60);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpForOfGenNext = $forOf(a);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
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
let a = 60;
const tmpIfTest = $(1);
let tmpForOfGenNext = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf(60);
} else {
  a = $($(100));
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
let a = 60;
const b = $( 1 );
let c = undefined;
if (b) {
  c = $forOf( 60 );
}
else {
  const d = $( 100 );
  a = $( d );
  c = $forOf( a );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
  }
}
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
