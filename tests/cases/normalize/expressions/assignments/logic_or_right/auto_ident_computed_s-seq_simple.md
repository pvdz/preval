# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = (1, 2, b)[$("c")]));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { c: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
} else {
  const tmpCompProp /*:unknown*/ = $(`c`);
  const tmpNestedComplexRhs /*:unknown*/ = b[tmpCompProp];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { c: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, b);
} else {
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = b[tmpCompProp];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(100) || (a = (1, 2, b)[$(`c`)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { c: 1 };
if (a) {
  $( a );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c, b );
}
else {
  const d = $( "c" );
  const e = b[ d ];
  $( e );
  $( e, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
