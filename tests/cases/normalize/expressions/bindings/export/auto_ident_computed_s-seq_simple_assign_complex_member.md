# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Bindings > Export > Auto ident computed s-seq simple assign complex member
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

export let a = ((1, 2, b)[$("c")] = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
const a /*:unknown*/ = tmpInitAssignLhsComputedRhs;
export { a };
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
const a = tmpInitAssignLhsComputedRhs;
export { a };
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
const f = e;
export { f as a };
$( f, b );
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
