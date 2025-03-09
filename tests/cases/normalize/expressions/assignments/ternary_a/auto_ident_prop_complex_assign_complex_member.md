# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident prop complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = $(b).c = $(b)[$("d")]) ? $(100) : $(200));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpNestedAssignPropRhs, b);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpNestedAssignPropRhs, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  $($(100));
  $(tmpNestedAssignPropRhs, b);
} else {
  $($(200));
  $(tmpNestedAssignPropRhs, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$((a = $(b).c = $(b)[$(`d`)]) ? $(100) : $(200));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, b);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
if (e) {
  const f = $( 100 );
  $( f );
  $( e, a );
}
else {
  const g = $( 200 );
  $( g );
  $( e, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 100
 - 5: 100
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
