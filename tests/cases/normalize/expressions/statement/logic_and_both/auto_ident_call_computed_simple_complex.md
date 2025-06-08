# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b[$("$")](1) && b[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const tmpIfTest /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpMCCP$1 /*:unknown*/ = $(`\$`);
  const tmpMCF$1 /*:unknown*/ = b[tmpMCCP$1];
  $dotCall(tmpMCF$1, b, undefined, 1);
  $(a);
} else {
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
  const tmpMCCP$1 = $(`\$`);
  b[tmpMCCP$1](1);
  $(a);
} else {
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
  const f = $( "$" );
  const g = b[ f ];
  $dotCall( g, b, undefined, 1 );
  $( e );
}
else {
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCCO = b;
const tmpMCCP = $(`\$`);
const tmpMCF = tmpMCCO[tmpMCCP];
const tmpIfTest = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
if (tmpIfTest) {
  const tmpMCCO$1 = b;
  const tmpMCCP$1 = $(`\$`);
  const tmpMCF$1 = tmpMCCO$1[tmpMCCP$1];
  $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
  $(a);
} else {
  $(a);
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
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
