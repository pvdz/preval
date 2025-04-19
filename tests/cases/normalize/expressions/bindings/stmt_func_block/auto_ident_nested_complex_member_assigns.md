# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident nested complex member assigns
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 },
      c = 3;

    let a = ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c);
    $(a, b, c);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
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
$(3, b, 3);
$(undefined);
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
$(3, b, 3);
$(undefined);
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
$( 3, a, 3 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { x: '1' }
 - 6: 'x'
 - 7: { x: '1' }
 - 8: 'x'
 - 9: { x: '1' }
 - 10: 'x'
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 3, { x: '3' }, 3
 - 14: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
