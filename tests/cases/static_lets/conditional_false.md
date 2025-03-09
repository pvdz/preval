# Preval test case

# conditional_false.md

> Static lets > Conditional false
>
> If the read of a value of a `let` binding can be determined then we should inline it.

## Input

`````js filename=intro
let x = 5;
if ($(false)) {
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
if ($(false)) {
  $(10, `a`);
  $(10);
} else {
  $(20, `b`);
  $(20);
}
`````

## Pre Normal


`````js filename=intro
let x = 5;
if ($(false)) {
  x = 10;
  const a = x;
  $(a, `a`);
} else {
  x = 20;
  const b = x;
  $(b, `b`);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = 5;
const tmpIfTest = $(false);
if (tmpIfTest) {
  x = 10;
  const a = x;
  $(x, `a`);
  $(x);
} else {
  x = 20;
  const b = x;
  $(x, `b`);
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - 2: 20, 'b'
 - 3: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
