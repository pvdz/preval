# Preval test case

# base_binary_noteq_null.md

> If flipping > Base binary noteq null
>
> When we can trivially detect an if to be using a flipped ident, use the ident instead

## Input

`````js filename=intro
const x = $(1);
const y = x != null; // Does not coerce, so this should not be observable
if (y) { // This should become x, with the branches flipped
  $('if');
} else {
  $('else');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const y /*:boolean*/ = x == null;
if (y) {
  $(`else`);
} else {
  $(`if`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) == null) {
  $(`else`);
} else {
  $(`if`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a == null;
if (b) {
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
const y = x != null;
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
 - 2: 'if'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
