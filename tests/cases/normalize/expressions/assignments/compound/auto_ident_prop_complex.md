# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a *= $(b).c));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpBinBothRhs /*:unknown*/ = tmpCompObj.c;
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpBinBothRhs = $(b).c;
const tmpClusterSSA_a = { a: 999, b: 1000 } * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
const d = {
  a: 999,
  b: 1000,
};
const e = d * c;
$( e );
$( e, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: NaN
 - 3: NaN, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
