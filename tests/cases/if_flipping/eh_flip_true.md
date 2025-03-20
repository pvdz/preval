# Preval test case

# eh_flip_true.md

> If flipping > Eh flip true
>
> An if-test that is the result of a bool conversion should use the arg directly

## Input

`````js filename=intro
const y = $(1);
const x = !y;
if (x) $('then');
else $('else');
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(1);
if (y) {
  $(`else`);
} else {
  $(`then`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`else`);
} else {
  $(`then`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "else" );
}
else {
  $( "then" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
