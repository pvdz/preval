# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > For in right > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
let tmpForInGen /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(60);
  tmpForInGen = $forIn(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$1);
  tmpForInGen = $forIn(tmpClusterSSA_tmpCalleeParam$1);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForInNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
let tmpForInGen = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn($(60));
} else {
  tmpForInGen = $forIn($($(100)));
}
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
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
  const c = $( 60 );
  b = $forIn( c );
}
else {
  const d = $( 100 );
  const e = $( d );
  b = $forIn( e );
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
 - 1: 1
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
