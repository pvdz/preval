# Preval test case

# base_binary_noteq_1.md

> If flipping > Base binary noteq 1
>
> When we can trivially detect an if to be using a flipped ident, use the ident instead

## Input

`````js filename=intro
const x = $(1);
const y = x != 1; // This may coerce so this should not be flipped
if (y) {
  $('if');
} else {
  $('else');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const y /*:boolean*/ = x != 1;
if (y) {
  $(`if`);
} else {
  $(`else`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) != 1) {
  $(`if`);
} else {
  $(`else`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a != 1;
if (b) {
  $( "if" );
}
else {
  $( "else" );
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
