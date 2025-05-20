# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Template > Auto ident computed simple simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = b["c"] = $(b)[$("d")])}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$3];
b.c = tmpNestedPropAssignRhs;
const tmpBinBothRhs /*:string*/ = $coerce(tmpNestedPropAssignRhs, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpNestedPropAssignRhs, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam$3 = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$3];
b.c = tmpNestedPropAssignRhs;
$(`before  ${tmpNestedPropAssignRhs}  after`);
$(tmpNestedPropAssignRhs, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
const e = $coerce( d, "string" );
const f = `before  ${e}  after`;
$( f );
$( d, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 'before 20 after'
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
