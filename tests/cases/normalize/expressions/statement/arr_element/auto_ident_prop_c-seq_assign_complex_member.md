# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Statement > Arr element > Auto ident prop c-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
((1, 2, $(b)).c = $(b)[$("d")]) + ((1, 2, $(b)).c = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
tmpInitAssignLhsComputedObj$1.c = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedRhs + tmpInitAssignLhsComputedRhs$1;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
const tmpInitAssignLhsComputedObj$1 = $(b);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
tmpInitAssignLhsComputedObj$1.c = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedRhs + tmpInitAssignLhsComputedRhs$1;
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
const f = $( a );
const g = $( a );
const h = $( "d" );
const i = g[ h ];
f.c = i;
e + i;
const j = {
  a: 999,
  b: 1000,
};
$( j, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
const tmpBinBothLhs = tmpInitAssignLhsComputedRhs;
const tmpInitAssignLhsComputedObj$1 = $(b);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
tmpInitAssignLhsComputedObj$1.c = tmpInitAssignLhsComputedRhs$1;
const tmpBinBothRhs = tmpInitAssignLhsComputedRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: { c: '20', d: '20' }
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
