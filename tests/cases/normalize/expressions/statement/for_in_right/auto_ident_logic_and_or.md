# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > For in right > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in ($($(1)) && $($(1))) || $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  tmpCalleeParam = $(tmpCalleeParam$3);
} else {
}
let tmpForInGen /*:unknown*/ = undefined;
if (tmpCalleeParam) {
  tmpForInGen = $forIn(tmpCalleeParam);
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$5);
  tmpForInGen = $forIn(tmpClusterSSA_tmpCalleeParam);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
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
let tmpCalleeParam = $($(1));
if (tmpCalleeParam) {
  tmpCalleeParam = $($(1));
}
let tmpForInGen = undefined;
if (tmpCalleeParam) {
  tmpForInGen = $forIn(tmpCalleeParam);
} else {
  tmpForInGen = $forIn($($(2)));
}
while (true) {
  const tmpForInNext = tmpForInGen.next();
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
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
let d = undefined;
if (b) {
  d = $forIn( b );
}
else {
  const e = $( 2 );
  const f = $( e );
  d = $forIn( f );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = d.next();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    g.value;
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
