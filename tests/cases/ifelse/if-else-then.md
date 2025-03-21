# Preval test case

# if-else-then.md

> Ifelse > If-else-then
>
> This should be abstracted

## Input

`````js filename=intro
function f() {
  $('A');
  if ($(1)) {
    $('B');
  } else {
    $('C');
  }
  $('D');
}
$(f());
`````


## Settled


`````js filename=intro
$(`A`);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`B`);
  $(`D`);
  $(undefined);
} else {
  $(`C`);
  $(`D`);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A`);
if ($(1)) {
  $(`B`);
  $(`D`);
  $(undefined);
} else {
  $(`C`);
  $(`D`);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A" );
const a = $( 1 );
if (a) {
  $( "B" );
  $( "D" );
  $( undefined );
}
else {
  $( "C" );
  $( "D" );
  $( undefined );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 1
 - 3: 'B'
 - 4: 'D'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
