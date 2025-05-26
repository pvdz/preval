# Preval test case

# unknown_if_false_false.md

> Ifelse > Ifelseifelse > Unknown if false false
>
> Common pattern of doing if-elseif-else after normalization. Will want to test all variations of known and unknown booleans, as well as which branch updates the condition.

## Input

`````js filename=intro
let condition = $(false);
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
const condition /*:unknown*/ = $(false);
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
if ($(false)) {
  if ($(false)) {
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
const a = $( false );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let condition = $(false);
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
