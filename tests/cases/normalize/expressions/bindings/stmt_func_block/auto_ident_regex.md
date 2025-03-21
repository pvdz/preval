# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident regex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = /foo/;
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/foo/);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
$( a );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
