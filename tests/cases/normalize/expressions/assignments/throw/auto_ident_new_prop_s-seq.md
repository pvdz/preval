# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Throw > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw (a = new (1, 2, b).$(1));
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
throw a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $(1);
throw a;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
throw a;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
