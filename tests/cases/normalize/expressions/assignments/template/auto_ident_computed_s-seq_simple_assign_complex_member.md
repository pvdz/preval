# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Template > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = (1, 2, b)[$("c")] = $(b)[$("d")])}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$3];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
const tmpBinBothRhs /*:string*/ = $coerce(tmpNestedPropAssignRhs, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpNestedPropAssignRhs, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam$3 = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$3];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
$(`before  ${tmpNestedPropAssignRhs}  after`);
$(tmpNestedPropAssignRhs, b);
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
const f = $coerce( e, "string" );
const g = `before  ${f}  after`;
$( g );
$( e, b );
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
 - 4: 'before 20 after'
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
