# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $($(0)) || 2);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
let tmpForOfGenNext /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpCalleeParam) {
  tmpForOfGenNext = $forOf(tmpCalleeParam);
} else {
  tmpForOfGenNext = $forOf(2);
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
const tmpCalleeParam = $($(0));
let tmpForOfGenNext = undefined;
if (tmpCalleeParam) {
  tmpForOfGenNext = $forOf(tmpCalleeParam);
} else {
  tmpForOfGenNext = $forOf(2);
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
const a = $( 0 );
const b = $( a );
let c = undefined;
if (b) {
  c = $forOf( b );
}
else {
  c = $forOf( 2 );
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
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
