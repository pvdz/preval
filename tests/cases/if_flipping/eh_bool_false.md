# Preval test case

# eh_bool_false.md

> If flipping > Eh bool false
>
> An if-test that is the result of a bool conversion should use the arg directly

## Input

`````js filename=intro
const y = $(0);
const x = Boolean(y);
if (x) $('then');
else $('else');
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(0);
if (y) {
  $(`then`);
} else {
  $(`else`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(`then`);
} else {
  $(`else`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( "then" );
}
else {
  $( "else" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const y = $(0);
const x = $boolean_constructor(y);
if (x) {
  $(`then`);
} else {
  $(`else`);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
