# Preval test case

# early_return6.md

> Normalize > Switch > Early return6
>
> Sorting out the branching stuff

Figuring out why nested if-elses remained in the output.

## Input

`````js filename=intro
const tmpBranchingB = function (v) {
  const x = 1 === v;
  if (x) {
    $(0);
  } else {
    const y = 2 === v;
    if (y) {
      $(1);
    } else {
      $(2);
    }
  }
};
const tmpReturnArg$11 = tmpBranchingB(1);
$(tmpReturnArg$11);
`````

## Settled


`````js filename=intro
$(0);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(undefined);
`````

## Pre Normal


`````js filename=intro
const tmpBranchingB = function ($$0) {
  let v = $$0;
  debugger;
  const x = 1 === v;
  if (x) {
    $(0);
  } else {
    const y = 2 === v;
    if (y) {
      $(1);
    } else {
      $(2);
    }
  }
};
const tmpReturnArg$11 = tmpBranchingB(1);
$(tmpReturnArg$11);
`````

## Normalized


`````js filename=intro
const tmpBranchingB = function ($$0) {
  let v = $$0;
  debugger;
  const x = 1 === v;
  if (x) {
    $(0);
    return undefined;
  } else {
    const y = 2 === v;
    if (y) {
      $(1);
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  }
};
const tmpReturnArg$11 = tmpBranchingB(1);
$(tmpReturnArg$11);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
