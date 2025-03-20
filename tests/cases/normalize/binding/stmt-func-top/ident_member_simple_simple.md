# Preval test case

# ident_member_simple_simple.md

> Normalize > Binding > Stmt-func-top > Ident member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = b.x = c;
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 3 };
$(3, b, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3, { x: 3 }, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 3 };
$( 3, a, 3 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
