# Preval test case

# base.md

> Ifelse > Ifelseifelse > Base
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
  condition = $(true);
  f();
} else {
  f();
}
`````


## Settled


`````js filename=intro
const condition /*:unknown*/ = $(true);
if (condition) {
  const tmpClusterSSA_tmpIfelseifelse /*:unknown*/ = $(true);
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
  if ($(true)) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`b`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( true );
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


## Normalized
(This is what phase1 received the first time)

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
  condition = $(true);
  f();
} else {
  f();
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
