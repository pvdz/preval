# Preval test case

# unknown_else_true_false.md

> Ifelse > Ifelseifelse > Unknown else true false
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
  f();
} else {
  condition = $(false);
  f();
}
`````


## Settled


`````js filename=intro
const condition /*:unknown*/ = $(true);
if (condition) {
  $(`a`);
} else {
  const tmpIfelseifelse /*:unknown*/ = $(false);
  if (tmpIfelseifelse) {
    $(`a`);
  } else {
    $(`b`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`a`);
} else {
  if ($(false)) {
    $(`a`);
  } else {
    $(`b`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "a" );
}
else {
  const b = $( false );
  if (b) {
    $( "a" );
  }
  else {
    $( "b" );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
