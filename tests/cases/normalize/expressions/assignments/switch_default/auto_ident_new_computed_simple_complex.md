# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident new computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new b[$("$")](1);
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
const tmpCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCompProp = $(`\$`);
const tmpNewCallee = { $: $ }[tmpCompProp];
$(new tmpNewCallee(1));
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = new b[$(`\$`)](1);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
