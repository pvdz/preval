# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident cond s-seq s-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = (10, 20, 30) ? (40, 50, 60) : $($(100));
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(60);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(60);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 60 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
