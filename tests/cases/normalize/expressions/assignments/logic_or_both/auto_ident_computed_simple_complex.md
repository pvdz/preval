# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = b[$("c")]) || (a = b[$("c")]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 1 };
const a /*:unknown*/ = b[tmpAssignRhsCompProp];
if (a) {
  $(a);
  $(a, b);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
  const tmpNestedComplexRhs /*:unknown*/ = b[tmpCalleeParam$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
const a = b[tmpAssignRhsCompProp];
if (a) {
  $(a);
  $(a, b);
} else {
  const tmpCalleeParam$1 = $(`c`);
  const tmpNestedComplexRhs = b[tmpCalleeParam$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
if (c) {
  $( c );
  $( c, b );
}
else {
  const d = $( "c" );
  const e = b[ d ];
  $( e );
  $( e, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  const tmpCompObj = b;
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
 - 1: 'c'
 - 2: 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
