# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a *= ++b));
$(a, b);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * 2;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = { a: 999, b: 1000 } * 2;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = a * 2;
$( b );
$( b, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
const tmpBinBothRhs = b;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
