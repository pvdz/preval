# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident cond simple c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 ? (40, 50, $(60)) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpThrowArg /*:unknown*/ = $(60);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $(60);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
throw a;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - eval returned: ('<crash[ 60 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
