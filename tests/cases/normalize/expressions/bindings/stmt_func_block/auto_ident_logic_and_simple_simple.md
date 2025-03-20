# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident logic and simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = 1 && 2;
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(2);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
