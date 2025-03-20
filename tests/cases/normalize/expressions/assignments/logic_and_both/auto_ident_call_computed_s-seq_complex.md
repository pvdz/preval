# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$("$")](1)) && (a = (1, 2, b)[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b[tmpCallCompProp](1);
if (a) {
  const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
  const tmpNestedComplexRhs /*:unknown*/ = b[tmpCallCompProp$1](1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const a = b[tmpCallCompProp](1);
if (a) {
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs = b[tmpCallCompProp$1](1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
if (c) {
  const d = $( "$" );
  const e = b[ d ]( 1 );
  $( e );
  $( e );
}
else {
  $( c );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
