# Preval test case

# else_arrow.md

> Ifelse > Simple > Else arrow
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (() => {}) $(1);
else $(2);
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
if (
  () => {
    debugger;
  }
)
  $(1);
else $(2);
`````

## Normalized


`````js filename=intro
const tmpIfTest = function () {
  debugger;
  return undefined;
};
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
