# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new ($(b)[$("$")])(1))];
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
const obj /*:object*/ = {};
obj[tmpClusterSSA_a];
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompObj$1 = $({ $: $ });
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp$1];
const tmpClusterSSA_a = new tmpNewCallee(1);
({}[tmpClusterSSA_a]);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new ($(b)[$(`\$`)])(1))];
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp$1];
a = new tmpNewCallee(1);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = new d( 1 );
const f = {};
f[ e ];
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
