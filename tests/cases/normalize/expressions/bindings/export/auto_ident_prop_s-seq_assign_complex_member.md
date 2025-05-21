# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Bindings > Export > Auto ident prop s-seq assign complex member
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

export let a = ((1, 2, b).c = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b.c = tmpInitAssignLhsComputedRhs;
const a /*:unknown*/ = tmpInitAssignLhsComputedRhs;
export { a };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
b.c = tmpInitAssignLhsComputedRhs;
const a = tmpInitAssignLhsComputedRhs;
export { a };
$(a, b);
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
const e = d;
export { e as a };
$( e, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
