# Preval test case

# auto_ident_call_computed_simple_simple.md

> Normalize > Expressions > Statement > Logic or left > Auto ident call computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b["$"](1) || $(100);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpIfTest /*:unknown*/ = $dotCall($, b, `\$`, 1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
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
const tmpIfTest = $dotCall($, { $: $ }, `\$`, 1);
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
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  $( 100 );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCF = b.$;
const tmpIfTest = $dotCall(tmpMCF, b, `\$`, 1);
if (tmpIfTest) {
  $(a);
} else {
  $(100);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
