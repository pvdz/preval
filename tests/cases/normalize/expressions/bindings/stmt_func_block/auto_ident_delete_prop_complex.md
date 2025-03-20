# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident delete prop complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = delete $(arg).y;
    $(a, arg);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const a /*:boolean*/ = delete tmpDeleteObj.y;
$(a, arg);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
$(delete tmpDeleteObj.y, arg);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
$( c, a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
