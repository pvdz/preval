# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Arr element > Auto ident computed simple complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
(b[$("c")] = $(b)[$("d")]) + (b[$("c")] = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`c`);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
b[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedRhs + tmpInitAssignLhsComputedRhs$1;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
const tmpInitAssignLhsComputedProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
b[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedRhs + tmpInitAssignLhsComputedRhs$1;
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
const f = $( "c" );
const g = $( b );
const h = $( "d" );
const i = g[ h ];
b[f] = i;
e + i;
const j = {
  a: 999,
  b: 1000,
};
$( j, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpInitAssignLhsComputedObj = b;
const tmpInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
const tmpBinBothLhs = tmpInitAssignLhsComputedRhs;
const tmpInitAssignLhsComputedObj$1 = b;
const tmpInitAssignLhsComputedProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCalleeParam$1];
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
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
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 'c'
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
