# Preval test case

# used_before_decl.md

> Normalize > Hoisting > Var > Used before decl
>
> Hoisting a var puts the var declaration at the top while actually invoking the initialization at the point of code. Normalization should fix this.

## Input

`````js filename=intro
function f() {
  a = $();
  var a = $();
  return a;
}
$(f());
`````


## Settled


`````js filename=intro
$();
const a /*:unknown*/ = $();
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$($());
`````


## PST Settled
With rename=true

`````js filename=intro
$();
const a = $();
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
