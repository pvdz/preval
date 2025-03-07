# Preval test case

# unknown_if_true_false.md

> Ifelse > Ifelseifelse > Unknown if true false
>
> Common pattern of doing if-elseif-else after normalization. Will want to test all variations of known and unknown booleans, as well as which branch updates the condition.

## Input

`````js filename=intro
let condition = $(true);
const f = function() {
  if (condition) {
    $('a');
  } else {
    $('b');
  }
};
if (condition) {
  condition = $(false);
  f();
} else {
  f();
}
`````

## Settled


`````js filename=intro
const condition /*:unknown*/ = $(true);
if (condition) {
  const tmpClusterSSA_tmpIfelseifelse /*:unknown*/ = $(false);
  if (tmpClusterSSA_tmpIfelseifelse) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`b`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  if ($(false)) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`b`);
}
`````

## Pre Normal


`````js filename=intro
let condition = $(true);
const f = function () {
  debugger;
  if (condition) {
    $(`a`);
  } else {
    $(`b`);
  }
};
if (condition) {
  condition = $(false);
  f();
} else {
  f();
}
`````

## Normalized


`````js filename=intro
let condition = $(true);
const f = function () {
  debugger;
  if (condition) {
    $(`a`);
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
if (condition) {
  condition = $(false);
  f();
} else {
  f();
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( false );
  if (b) {
    $( "a" );
  }
  else {
    $( "b" );
  }
}
else {
  $( "b" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: false
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
