# Preval test case

# unary_multi_read_good.md

> If flipping > Unary multi read good
>
> When the binding is used in multiple `if`s

## Input

`````js filename=intro
const x = $(1);
const y = !x;
if (y) { // This should become x, with the branches flipped
  $('if1');
} else {
  $('else1');
}

if (y) { // This should also become x, with the branches flipped
  $('if2');
} else {
  $('else2');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(`else1`);
  $(`else2`);
} else {
  $(`if1`);
  $(`if2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`else1`);
  $(`else2`);
} else {
  $(`if1`);
  $(`if2`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "else1" );
  $( "else2" );
}
else {
  $( "if1" );
  $( "if2" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'else1'
 - 3: 'else2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
