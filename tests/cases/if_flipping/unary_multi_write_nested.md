# Preval test case

# unary_multi_write_nested.md

> If flipping > Unary multi write nested
>
> When the binding is used in multiple `if`s

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
let y = !a;
if (y) { // This should become x, with the branches flipped
  $('if1');
} else {
  y = !b; // This will get SSA'd and the SSA'd var gets flipped and eliminated
  if (y) {
    $('if2');
  } else {
    $('else1');
  }
}

//$(y, 'after');
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(2);
if (a) {
  if (b) {
    $(`else1`);
  } else {
    $(`if2`);
  }
} else {
  $(`if1`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
const b = $(2);
if (a) {
  if (b) {
    $(`else1`);
  } else {
    $(`if2`);
  }
} else {
  $(`if1`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
if (a) {
  if (b) {
    $( "else1" );
  }
  else {
    $( "if2" );
  }
}
else {
  $( "if1" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'else1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
