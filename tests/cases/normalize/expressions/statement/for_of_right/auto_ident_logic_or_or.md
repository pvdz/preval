# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > For of right > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $($(0)) || $($(1)) || $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  tmpCalleeParam = $(tmpCalleeParam$3);
  if (tmpCalleeParam) {
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    tmpCalleeParam = $(tmpCalleeParam$5);
  }
}
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
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
let tmpCalleeParam = $($(0));
if (!tmpCalleeParam) {
  tmpCalleeParam = $($(1));
  if (!tmpCalleeParam) {
    tmpCalleeParam = $($(2));
  }
}
const tmpForOfGen = $forOf(tmpCalleeParam);
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
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
const e = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = e();
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
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
