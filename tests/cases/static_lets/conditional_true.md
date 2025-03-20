# Preval test case

# conditional_true.md

> Static lets > Conditional true
>
> If the read of a value of a `let` binding can be determined then we should inline it.

## Input

`````js filename=intro
let x = 5;
if ($(true)) {
  x = 10;
  const a = x;
  $(a, 'a');
} else {
  x = 20;
  const b = x;
  $(b, 'b');
}
$(x);
`````


## Settled


`````js filename=intro
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 10, 'a'
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
