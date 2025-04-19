# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Logic or left > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b[$("$")](1) || $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const tmpIfTest /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(100);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const b = { $: $ };
const tmpIfTest = b[tmpMCCP](1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(100);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  $( e );
}
else {
  $( 100 );
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
