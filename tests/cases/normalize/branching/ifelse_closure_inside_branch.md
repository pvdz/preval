# Preval test case

# ifelse_closure_inside_branch.md

> Normalize > Branching > Ifelse closure inside branch
>
> If a branch contains a function that closes over an outside binding in the tail then that should keep working...

## Input

`````js filename=intro
const f = function () {
  if ($) {
    const g = function () {
      // This is a closure but after if-else normalization this if-branch becomes its own function without access to it
      $(xyz);
    };
    $(g);
  }
  const xyz = $();
  $(1);
};
$(f());
`````


## Settled


`````js filename=intro
if ($) {
  const g /*:()=>undefined*/ = function () {
    debugger;
    $(xyz);
    return undefined;
  };
  $(g);
} else {
}
const xyz /*:unknown*/ = $();
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(function () {
    $(xyz);
  });
}
const xyz = $();
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = function() {
    debugger;
    $( b );
    return undefined;
  };
  $( a );
}
const b = $();
$( 1 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
