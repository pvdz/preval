# Preval test case

# base.md

> Static lets > Base
>
> If the read of a value of a `let` binding can be determined then we should inline it.

## Input

`````js filename=intro
let x = 5;
$(x);
if ($) {
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
if ($) {
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
if ($) {
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
if ($) {
  $( 10, "a" );
  $( 10 );
}
else {
  $( 20, "b" );
  $( 20 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 10, 'a'
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
