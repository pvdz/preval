# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Bindings > Switch case > Auto ident arrow
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = () => {};
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
