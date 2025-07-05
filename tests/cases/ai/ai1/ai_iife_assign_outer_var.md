# Preval test case

# ai_iife_assign_outer_var.md

> Ai > Ai1 > Ai iife assign outer var
>
> Test: IIFE assigning to an outer scope variable.

## Input

`````js filename=intro
// Expected: const $$val = $('val_in_iife'); $('use', $$val);
let x;
(function() {
  x = $('val_in_iife');
})();
$('use', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val_in_iife`);
$(`use`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`use`, $(`val_in_iife`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val_in_iife" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpCallComplexCallee = function () {
  debugger;
  x = $(`val_in_iife`);
  return undefined;
};
tmpCallComplexCallee();
$(`use`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val_in_iife'
 - 2: 'use', 'val_in_iife'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
