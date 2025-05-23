# Preval test case

# var_branch_write_branch_read.md

> Assigns > Var branch write branch read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
if ($('if')) {
  x = 10; // Can be made into a constant
  $(x);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`if`);
if (tmpIfTest) {
  $(10);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`if`)) {
  $(10);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "if" );
if (a) {
  $( 10 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(`if`);
if (tmpIfTest) {
  x = 10;
  $(x);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'if'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
