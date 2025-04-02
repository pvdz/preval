# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > For in right > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $($(0)) || $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
let tmpForInGen /*:unknown*/ = undefined;
if (tmpCalleeParam) {
  tmpForInGen = $forIn(tmpCalleeParam);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$3);
  tmpForInGen = $forIn(tmpClusterSSA_tmpCalleeParam);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
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
const tmpCalleeParam = $($(0));
let tmpForInGen = undefined;
if (tmpCalleeParam) {
  tmpForInGen = $forIn(tmpCalleeParam);
} else {
  tmpForInGen = $forIn($($(2)));
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
const a = $( 0 );
const b = $( a );
let c = undefined;
if (b) {
  c = $forIn( b );
}
else {
  const d = $( 2 );
  const e = $( d );
  c = $forIn( e );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = c();
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
