# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(1) ? b[$("$")](1) : $(200);
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallCompProp /*:unknown*/ = $(`\$`);
  const b /*:object*/ = { $: $ };
  b[tmpCallCompProp](1);
  $(a);
} else {
  $(200);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallCompProp = $(`\$`);
  ({ $: $ }[tmpCallCompProp](1));
  $(a);
} else {
  $(200);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(1) ? b[$(`\$`)](1) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCompObj = b;
  const tmpCallCompProp = $(`\$`);
  tmpCallCompObj[tmpCallCompProp](1);
  $(a);
} else {
  $(200);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( "$" );
  const d = { $: $ };
  d[ c ]( 1 );
  $( b );
}
else {
  $( 200 );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
