# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Arr element > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(
  (a = (1, 2, b)[$("c")] = $(b)[$("d")]) +
    (a = (1, 2, b)[$("c")] = $(b)[$("d")])
);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`c`);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp$1 /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignPropRhs + tmpNestedAssignPropRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignPropRhs$1, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
$(tmpNestedAssignPropRhs + tmpNestedAssignPropRhs$1);
$(tmpNestedAssignPropRhs$1, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$(`c`)] = $(b)[$(`d`)]) + (a = (1, 2, b)[$(`c`)] = $(b)[$(`d`)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpBinBothLhs = a;
const tmpNestedAssignComMemberObj$1 = b;
const tmpNestedAssignComMemberProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
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
const j = e + i;
$( j );
$( i, b );
`````

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
 - 7: 40
 - 8: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
