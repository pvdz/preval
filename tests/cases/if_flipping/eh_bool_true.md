# Preval test case

# eh_bool_true.md

> If flipping > Eh bool true
>
> An if-test that is the result of a bool conversion should use the arg directly

## Input

`````js filename=intro
const y = $(1);
const x = Boolean(y);
if (x) $('then');
else $('else');
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(1);
if (y) {
  $(`then`);
} else {
  $(`else`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`then`);
} else {
  $(`else`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
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
const y = $(1);
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
 - 1: 1
 - 2: 'then'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
