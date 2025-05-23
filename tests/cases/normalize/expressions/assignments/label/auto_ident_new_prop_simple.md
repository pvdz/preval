# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Assignments > Label > Auto ident new prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
label: a = new b.$(1);
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
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
