# Preval test case

# eh_flip_false.md

> If flipping > Eh flip false
>
> An if-test that is the result of a bool conversion should use the arg directly

## Input

`````js filename=intro
const y = $(0);
const x = !y;
if (x) $('then');
else $('else');
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(0);
if (y) {
  $(`else`);
} else {
  $(`then`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(`else`);
} else {
  $(`then`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( "else" );
}
else {
  $( "then" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'then'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
