# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident cond s-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (10, 20, 30) ? $(2) : $($(100)))];
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
const obj /*:object*/ = {};
obj[a];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(2);
({}[a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = {};
b[ a ];
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
