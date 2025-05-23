# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = new (1, 2, b).$(1))["a"];
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
a.a;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $(1);
a.a;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
a.a;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = b;
const tmpNewCallee = tmpCompObj$1.$;
a = new tmpNewCallee(1);
const tmpCompObj = a;
tmpCompObj.a;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
