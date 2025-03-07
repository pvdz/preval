# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) || (a = (1, 2, $(b))[$("$")](1)));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const b /*:object*/ = { $: $ };
  const tmpCallCompObj /*:unknown*/ = $(b);
  const tmpCallCompProp /*:unknown*/ = $(`\$`);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpCallCompObj = $({ $: $ });
  const tmpCallCompProp = $(`\$`);
  const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(100) || (a = (1, 2, $(b))[$(`\$`)](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
if (b) {
  $( b );
}
else {
  const c = { $: $ };
  const d = $( c );
  const e = $( "$" );
  const f = d[ e ]( 1 );
  a = f;
  $( f );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
