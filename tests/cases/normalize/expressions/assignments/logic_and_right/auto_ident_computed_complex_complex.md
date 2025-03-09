# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)[$("c")]));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { c: 1 };
if (tmpCalleeParam) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`c`);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { c: 1 };
if (tmpCalleeParam) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)[$(`c`)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
  $(tmpCalleeParam);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { c: 1 };
if (a) {
  const c = $( b );
  const d = $( "c" );
  const e = c[ d ];
  $( e );
  $( e, b );
}
else {
  $( a );
  const f = {
    a: 999,
    b: 1000,
  };
  $( f, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 1
 - 5: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
