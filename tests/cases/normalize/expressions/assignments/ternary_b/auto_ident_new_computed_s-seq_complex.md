# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1) ? (a = new (1, 2, b)[$("$")](1)) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCompProp /*:unknown*/ = $(`\$`);
  const b /*:object*/ = { $: $ };
  const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = { $: $ }[tmpCompProp];
  const tmpNestedComplexRhs = new tmpNewCallee(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(1) ? (a = new (1, 2, b)[$(`\$`)](1)) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompObj = b;
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  const tmpNestedComplexRhs = new tmpNewCallee(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
const a = $( 1 );
if (a) {
  const b = $( "$" );
  const c = { $: $ };
  const d = c[ b ];
  const e = new d( 1 );
  $( e );
  $( e );
}
else {
  const f = $( 200 );
  $( f );
  const g = {
    a: 999,
    b: 1000,
  };
  $( g );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: {}
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
