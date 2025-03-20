# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident array simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = [1, 2, 3];
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
