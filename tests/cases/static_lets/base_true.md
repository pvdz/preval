# Preval test case

# base_true.md

> Static lets > Base true
>
> If the read of a value of a `let` binding can be determined then we should inline it.

## Input

`````js filename=intro
let x = 5;
$(x);
if ($(true)) {
  x = 10;
  $(x, 'a'); // Note: $ gets invoked _after_ reading x so it should not block the inline
} else {
  x = 20;
  $(x, 'b');
}
$(x);
`````


## Settled


`````js filename=intro
$(5);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(10, `a`);
  $(10);
} else {
  $(20, `b`);
  $(20);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5);
if ($(true)) {
  $(10, `a`);
  $(10);
} else {
  $(20, `b`);
  $(20);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5 );
const a = $( true );
if (a) {
  $( 10, "a" );
  $( 10 );
}
else {
  $( 20, "b" );
  $( 20 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 5;
$(x);
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 10;
  $(x, `a`);
  $(x);
} else {
  x = 20;
  $(x, `b`);
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: true
 - 3: 10, 'a'
 - 4: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
