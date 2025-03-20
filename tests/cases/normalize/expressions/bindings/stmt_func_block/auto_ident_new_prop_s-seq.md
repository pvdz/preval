# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident new prop s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = new (1, 2, b).$(1);
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(1));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
