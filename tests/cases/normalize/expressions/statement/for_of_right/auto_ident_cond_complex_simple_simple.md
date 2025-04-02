# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $(1) ? 2 : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
let tmpForOfGen /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForOfGen = $forOf(2);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
  tmpForOfGen = $forOf(tmpClusterSSA_tmpCalleeParam);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
let tmpForOfGen = undefined;
if (tmpIfTest) {
  tmpForOfGen = $forOf(2);
} else {
  tmpForOfGen = $forOf($($(100)));
}
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = undefined;
if (a) {
  b = $forOf( 2 );
}
else {
  const c = $( 100 );
  const d = $( c );
  b = $forOf( d );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = b();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
