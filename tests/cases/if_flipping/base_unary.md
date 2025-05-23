# Preval test case

# base_unary.md

> If flipping > Base unary
>
> When we can trivially detect an if to be using a flipped ident, use the ident instead

## Input

`````js filename=intro
const x = $(1);
const y = !x;
if (y) { // This should become x, with the branches flipped
  $('if');
} else {
  $('else');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(`else`);
} else {
  $(`if`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`else`);
} else {
  $(`if`);
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
  $( "if" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const y = !x;
if (y) {
  $(`if`);
} else {
  $(`else`);
}
`````


## Todos triggered


None


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
