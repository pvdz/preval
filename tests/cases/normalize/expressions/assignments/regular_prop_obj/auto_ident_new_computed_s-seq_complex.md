# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = new (1, 2, b)[$("$")](1)).a;
$(a);
`````

## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
tmpClusterSSA_a.a;
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`\$`);
const tmpNewCallee = { $: $ }[tmpCompProp];
const tmpClusterSSA_a = new tmpNewCallee(1);
tmpClusterSSA_a.a;
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
(a = new (1, 2, b)[$(`\$`)](1)).a;
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp];
a = new tmpNewCallee(1);
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
d.a;
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
