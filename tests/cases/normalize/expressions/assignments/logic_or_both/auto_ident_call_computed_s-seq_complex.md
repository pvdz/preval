# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$("$")](1)) || (a = (1, 2, b)[$("$")](1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
let a /*:unknown*/ = b[tmpCallCompProp](1);
if (a) {
  $(a);
} else {
  const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
  const tmpNestedComplexRhs /*:unknown*/ = b[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
let a = b[tmpCallCompProp](1);
if (a) {
  $(a);
} else {
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = b[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$(`\$`)](1)) || (a = (1, 2, b)[$(`\$`)](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCompObj$1 = b;
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = tmpCallCompObj$1[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
let c = b[ a ]( 1 );
if (c) {
  $( c );
}
else {
  const d = $( "$" );
  const e = b[ d ]( 1 );
  c = e;
  $( e );
}
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
