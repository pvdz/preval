# Preval test case

# identity.md

> Binary > Eq strong > Identity
>
> The triple eq identity check can resolve for an ident on itself
> And let's face it. The whole example should be collapsed.
> The <= 0 check can also be inferred to be true.
> What about NaN tho? (And document.all kinds of cases)

## Input

`````js filename=intro
let tmpSwitchCaseToStart = 1;
let tmpIfTest$1 = true;
const tmpIfTest = $ === $; // Should eliminate this one but it won't
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
}
if (tmpIfTest$1) {
  try {
    $(x, 1);
  } catch ($finalImplicit) {}
  $(2);
} else {
  $(`oops`);
}
$(3);
`````


## Settled


`````js filename=intro
try {
  $(x, 1);
} catch ($finalImplicit) {}
$(2);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(x, 1);
} catch ($finalImplicit) {}
$(2);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( x, 1 );
}
catch (a) {

}
$( 2 );
$( 3 );
`````


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
