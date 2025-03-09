# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)[$("$")](1)) ? $(100) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const tmpClusterSSA_a /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
if (tmpClusterSSA_a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompObj = $({ $: $ });
const tmpCallCompProp = $(`\$`);
const tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
if (tmpClusterSSA_a) {
  $($(100));
  $(tmpClusterSSA_a);
} else {
  $($(200));
  $(tmpClusterSSA_a);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = $(b)[$(`\$`)](1)) ? $(100) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ]( 1 );
if (d) {
  const e = $( 100 );
  $( e );
  $( d );
}
else {
  const f = $( 200 );
  $( f );
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 100
 - 5: 100
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
