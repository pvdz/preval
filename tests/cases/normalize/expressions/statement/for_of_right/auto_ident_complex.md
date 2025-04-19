# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x of $(b));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
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
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGenNext = $forOf($(1));
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e, 1 );
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
