# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = { a: 999, b: 1000 };
    a = delete arg["y"];
    $(a, arg);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
$(a, arg);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
$(delete arg.y, arg);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
$( b, a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
