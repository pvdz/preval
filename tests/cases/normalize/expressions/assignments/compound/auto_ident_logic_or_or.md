# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Compound > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(0)) || $($(1)) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$3);
  if (tmpBinBothRhs) {
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$5);
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothRhs = $($(0));
if (!tmpBinBothRhs) {
  tmpBinBothRhs = $($(1));
  if (!tmpBinBothRhs) {
    tmpBinBothRhs = $($(2));
  }
}
const tmpClusterSSA_a = { a: 999, b: 1000 } * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
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
const e = {
  a: 999,
  b: 1000,
};
const f = e * b;
$( f );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpCalleeParam$1 = $(0);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
} else {
  let tmpCalleeParam$3 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$3);
  if (tmpBinBothRhs) {
  } else {
    let tmpCalleeParam$5 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$5);
  }
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a);
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
 - 5: NaN
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
