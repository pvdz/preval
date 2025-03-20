# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Statement > Throw > Auto ident prop s-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
throw ((1, 2, b).c = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
throw varInitAssignLhsComputedRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
throw varInitAssignLhsComputedRhs;
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
throw d;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - eval returned: ('<crash[ 20 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
