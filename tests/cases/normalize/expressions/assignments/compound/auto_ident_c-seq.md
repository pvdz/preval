# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Compound > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a *= ($(1), $(2), $(x))));
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpBinBothRhs /*:unknown*/ = $(1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpBinBothRhs = $(1);
const tmpClusterSSA_a = { a: 999, b: 1000 } * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
const c = b * a;
$( c );
$( c, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
$(1);
$(2);
const tmpBinBothRhs = $(x);
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: NaN
 - 5: NaN, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
