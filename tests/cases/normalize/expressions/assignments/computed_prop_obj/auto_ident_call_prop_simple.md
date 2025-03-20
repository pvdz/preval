# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident call prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = b.$(1))["a"];
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b.$(1);
a.a;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = { $: $ }.$(1);
a.a;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
b.a;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
