# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident new computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((a = new (1, 2, $(b))["$"](1))) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
$(100);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $({ $: $ }).$;
const tmpClusterSSA_a = new tmpNewCallee(1);
$(100);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = new (1, 2, $(b))[`\$`](1));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = new c( 1 );
$( 100 );
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 100
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
