# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)[$("$")](1)) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpMCCO /*:unknown*/ = $(b);
  const tmpMCCP /*:unknown*/ = $(`\$`);
  const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  const tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpMCCO = $({ $: $ });
  const tmpMCCP = $(`\$`);
  const tmpNestedComplexRhs = tmpMCCO[tmpMCCP](1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = { $: $ };
  const c = $( b );
  const d = $( "$" );
  const e = c[ d ];
  const f = $dotCall( e, c, undefined, 1 );
  $( f );
  $( f );
}
else {
  const g = $( 200 );
  $( g );
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
