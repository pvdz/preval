# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Statement > Ternary c > Auto ident new prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : new (1, 2, $(b)).$(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const b /*:object*/ /*truthy*/ = { $: $ };
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
  new tmpNewCallee(1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpNewCallee = $({ $: $ }).$;
  new tmpNewCallee(1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b );
}
else {
  const c = { $: $ };
  const d = $( c );
  const e = d.$;
  new e( 1 );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
