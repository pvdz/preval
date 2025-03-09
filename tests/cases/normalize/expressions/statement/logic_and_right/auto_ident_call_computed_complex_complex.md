# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) && $(b)[$("$")](1);
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpCallCompObj /*:unknown*/ = $(b);
  const tmpCallCompProp /*:unknown*/ = $(`\$`);
  tmpCallCompObj[tmpCallCompProp](1);
  $(a);
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallCompObj = $({ $: $ });
  const tmpCallCompProp = $(`\$`);
  tmpCallCompObj[tmpCallCompProp](1);
  $(a);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(100) && $(b)[$(`\$`)](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  tmpCallCompObj[tmpCallCompProp](1);
  $(a);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = { $: $ };
  const d = $( c );
  const e = $( "$" );
  d[ e ]( 1 );
  $( b );
}
else {
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
