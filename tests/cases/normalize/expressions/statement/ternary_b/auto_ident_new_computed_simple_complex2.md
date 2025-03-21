# Preval test case

# auto_ident_new_computed_simple_complex2.md

> Normalize > Expressions > Statement > Ternary b > Auto ident new computed simple complex2
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
const b = { $: $ };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = b[tmpCompProp];
  new tmpNewCallee(1);
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCompProp /*:unknown*/ = $(`\$`);
  const b /*:object*/ = { $: $ };
  const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
  new tmpNewCallee(1);
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = { $: $ }[tmpCompProp];
  new tmpNewCallee(1);
} else {
  $(200);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( "$" );
  const c = { $: $ };
  const d = c[ b ];
  new d( 1 );
}
else {
  $( 200 );
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Todos triggered


None


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
