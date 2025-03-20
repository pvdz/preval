# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (1, 2, b)[$("$")](1)):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b[tmpCallCompProp](1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCallCompProp = $(`\$`);
$({ $: $ }[tmpCallCompProp](1));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
