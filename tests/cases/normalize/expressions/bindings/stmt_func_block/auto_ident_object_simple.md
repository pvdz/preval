# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = { x: 1, y: 2, z: 3 };
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 1, y: 2, z: 3 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
