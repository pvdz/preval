# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident cond s-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (10, 20, 30) ? (40, 50, $(60)) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpThrowArg /*:unknown*/ = $(60);
throw tmpClusterSSA_tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpThrowArg = $(60);
throw tmpClusterSSA_tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpThrowArg = $(60);
} else {
  let tmpCalleeParam = $(100);
  tmpThrowArg = $(tmpCalleeParam);
}
throw tmpThrowArg;
`````


## Todos triggered


None


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
