# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = $($(0)) || 2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpForInGen /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  tmpForInGen = $forIn(a);
} else {
  a = 2;
  tmpForInGen = $forIn(2);
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
let a = $($(0));
let tmpForInGen = undefined;
if (a) {
  tmpForInGen = $forIn(a);
} else {
  a = 2;
  tmpForInGen = $forIn(2);
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
const a = $( 0 );
let b = $( a );
let c = undefined;
if (b) {
  c = $forIn( b );
}
else {
  b = 2;
  c = $forIn( 2 );
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
$( b );
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
