# Preval test case

# base2.md

> Static lets > Base2
>
> If the read of a value of a `let` binding can be determined then we should inline it.

## Input

`````js filename=intro
let x = 5;
$(x);
if ($(false)) {
  x = 10;
  $(x, 'a');
} else {
  x = 20;
  $(x, 'b');
}
$(x);
`````


## Settled


`````js filename=intro
$(5);
const tmpIfTest /*:unknown*/ = $(false);
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
if ($(false)) {
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
const a = $( false );
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
const tmpIfTest = $(false);
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
 - 2: false
 - 3: 20, 'b'
 - 4: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
