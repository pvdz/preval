# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Bindings > Export > Auto ident nested complex member assigns
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

export let a = ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
  b
)[$("x")] = $(b)[$("x")] = c);
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$9 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$9 /*:unknown*/ = $(`x`);
tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = 3;
tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
const a /*:number*/ /*truthy*/ = 3;
export { a };
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
const tmpInitAssignLhsComputedObj$1 = $(b);
const tmpInitAssignLhsComputedProp$1 = $(`x`);
const tmpInitAssignLhsComputedObj$3 = $(b);
const tmpInitAssignLhsComputedProp$3 = $(`x`);
const tmpInitAssignLhsComputedObj$5 = $(b);
const tmpInitAssignLhsComputedProp$5 = $(`x`);
const tmpInitAssignLhsComputedObj$7 = $(b);
const tmpInitAssignLhsComputedProp$7 = $(`x`);
const tmpInitAssignLhsComputedObj$9 = $(b);
const tmpInitAssignLhsComputedProp$9 = $(`x`);
tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = 3;
tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
const a = 3;
export { a };
$(3, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = $( a );
const e = $( "x" );
const f = $( a );
const g = $( "x" );
const h = $( a );
const i = $( "x" );
const j = $( a );
const k = $( "x" );
const l = $( a );
const m = $( "x" );
l[m] = 3;
j[k] = 3;
h[i] = 3;
f[g] = 3;
d[e] = 3;
b[c] = 3;
const n = 3;
export { n as a };
$( 3, a, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
const tmpInitAssignLhsComputedObj$1 = $(b);
const tmpInitAssignLhsComputedProp$1 = $(`x`);
const tmpInitAssignLhsComputedObj$3 = $(b);
const tmpInitAssignLhsComputedProp$3 = $(`x`);
const tmpInitAssignLhsComputedObj$5 = $(b);
const tmpInitAssignLhsComputedProp$5 = $(`x`);
const tmpInitAssignLhsComputedObj$7 = $(b);
const tmpInitAssignLhsComputedProp$7 = $(`x`);
const tmpInitAssignLhsComputedObj$9 = $(b);
const tmpInitAssignLhsComputedProp$9 = $(`x`);
const tmpInitAssignLhsComputedRhs$9 = c;
tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = tmpInitAssignLhsComputedRhs$9;
const tmpInitAssignLhsComputedRhs$7 = tmpInitAssignLhsComputedRhs$9;
tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = tmpInitAssignLhsComputedRhs$7;
const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
let a = tmpInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
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
