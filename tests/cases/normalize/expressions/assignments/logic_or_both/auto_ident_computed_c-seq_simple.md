# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$("c")]) || (a = (1, 2, $(b))[$("c")]));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpAssignRhsCompObj /*:unknown*/ = $(b);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const a /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (a) {
  $(a);
  $(a, b);
} else {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
const a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (a) {
  $(a);
  $(a, b);
} else {
  const tmpCompObj = $(b);
  const tmpCalleeParam$1 = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCalleeParam$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
if (d) {
  $( d );
  $( d, a );
}
else {
  const e = $( a );
  const f = $( "c" );
  const g = e[ f ];
  $( g );
  $( g, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  const tmpCompObj = $(b);
  const tmpCalleeParam$1 = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCalleeParam$1];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
