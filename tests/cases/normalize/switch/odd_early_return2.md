# Preval test case

# odd_early_return2.md

> Normalize > Switch > Odd early return2
>
> Sorting out the branching stuff

## Input

`````js filename=intro
const A = function () {
  if ($) {
    $(2);
  }
};

const f = function () {
  const B = function () {
    if ($) {
      const tmpReturnArg$3 = A();
      return tmpReturnArg$3;
    }
  };

  if ($) {
    const tmpReturnArg$53 = B();
    return tmpReturnArg$53;
  }
};

const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Settled


`````js filename=intro
if ($) {
  $(2);
  $(undefined);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(2);
  $(undefined);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
const A = function () {
  debugger;
  if ($) {
    $(2);
  }
};
const f = function () {
  debugger;
  const B = function () {
    debugger;
    if ($) {
      const tmpReturnArg$3 = A();
      return tmpReturnArg$3;
    }
  };
  if ($) {
    const tmpReturnArg$53 = B();
    return tmpReturnArg$53;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Normalized


`````js filename=intro
const A = function () {
  debugger;
  if ($) {
    $(2);
    return undefined;
  } else {
    return undefined;
  }
};
const f = function () {
  debugger;
  const B = function () {
    debugger;
    if ($) {
      const tmpReturnArg$3 = A();
      return tmpReturnArg$3;
    } else {
      return undefined;
    }
  };
  if ($) {
    const tmpReturnArg$53 = B();
    return tmpReturnArg$53;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 2 );
  $( undefined );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
