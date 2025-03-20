# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (1, 2, $(b))[$("c")]) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsCompObj /*:unknown*/ = $(b);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(undefined);
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
b[ c ];
$( undefined );
const d = {
  a: 999,
  b: 1000,
};
$( d, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: undefined
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
