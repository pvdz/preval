# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $($(1)) && $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
let tmpForOfGenNext /*:unknown*/ = undefined;
if (tmpCalleeParam) {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$3);
  tmpForOfGenNext = $forOf(tmpClusterSSA_tmpCalleeParam);
} else {
  tmpForOfGenNext = $forOf(tmpCalleeParam);
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
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $($(1));
let tmpForOfGenNext = undefined;
if (tmpCalleeParam) {
  tmpForOfGenNext = $forOf($($(2)));
} else {
  tmpForOfGenNext = $forOf(tmpCalleeParam);
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
const a = $( 1 );
const b = $( a );
let c = undefined;
if (b) {
  const d = $( 2 );
  const e = $( d );
  c = $forOf( e );
}
else {
  c = $forOf( b );
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
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
