# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
let tmpForOfGenNext /*:unknown*/ = undefined;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(2);
  tmpForOfGenNext = $forOf(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$1);
  tmpForOfGenNext = $forOf(tmpClusterSSA_tmpCalleeParam$1);
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
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
let tmpForOfGenNext = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf($(2));
} else {
  tmpForOfGenNext = $forOf($($(100)));
}
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
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
const a = $( 30 );
let b = undefined;
if (a) {
  const c = $( 2 );
  b = $forOf( c );
}
else {
  const d = $( 100 );
  const e = $( d );
  b = $forOf( e );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = b();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    f.value;
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
