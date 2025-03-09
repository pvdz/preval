# Preval test case

# var_branch_write_branch_read_outer_read.md

> Assigns > Var branch write branch read outer read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
if ($('if')) {
  x = 10; // Can not be made into a constant without branch extrapolation
  $(x); // We should be able to determine that this must be 10, somehow
}
$(x);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`if`);
if (tmpIfTest) {
  $(10);
  $(10);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`if`)) {
  $(10);
  $(10);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($(`if`)) {
  x = 10;
  $(x);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(`if`);
if (tmpIfTest) {
  x = 10;
  $(x);
  $(x);
} else {
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "if" );
if (a) {
  $( 10 );
  $( 10 );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'if'
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
