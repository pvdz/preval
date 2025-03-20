# Preval test case

# ifelse_with_tail_closure_binding.md

> Normalize > Branching > Ifelse with tail closure binding
>
> Regression found while running Preval on Tenko

The problem is that if-else normalization would slice the tail into its own function. But if the tail contained a var decl that was also used in a closure (defined before the if) then the binding would not be accessible anymore, leading to a global variable.

## Input

`````js filename=intro
const f = function () {
  const g = function () {
    $(xyz);
  };
  if ($) {
    $(1);
  }
  const xyz = $();
  return g();
};
$(f());
`````


## Settled


`````js filename=intro
if ($) {
  $(1);
} else {
}
const xyz /*:unknown*/ = $();
$(xyz);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
}
$($());
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
}
const a = $();
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 
 - 3: undefined
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
