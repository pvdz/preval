# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > For in right > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
let tmpForInGen /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  tmpForInGen = $forIn(a);
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$5);
  tmpForInGen = $forIn(a);
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
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
let tmpForInGen = undefined;
if (a) {
  tmpForInGen = $forIn(a);
} else {
  a = $($(2));
  tmpForInGen = $forIn(a);
}
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(a);
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
  b = $( e );
  d = $forIn( b );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    f.value;
  }
}
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
