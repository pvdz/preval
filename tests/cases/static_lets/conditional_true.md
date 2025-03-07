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
let x /*:number*/ = 10;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(10, `a`);
} else {
  x = 20;
  $(20, `b`);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 10;
if ($(true)) {
  $(10, `a`);
} else {
  x = 20;
  $(20, `b`);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = 5;
if ($(true)) {
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
const tmpIfTest = $(true);
if (tmpIfTest) {
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

## PST Settled
With rename=true

`````js filename=intro
let a = 10;
const b = $( true );
if (b) {
  $( 10, "a" );
}
else {
  a = 20;
  $( 20, "b" );
}
$( a );
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
