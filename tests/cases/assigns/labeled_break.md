# Preval test case

# labeled_break.md

> Assigns > Labeled break
>
> Breaking to labels may be funky for ref tracking

## Input

`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      x = 20;
      break foo;
    }
    $(x); // can NOT observe the 20 (ignoring that it is dead code)
  }
  $(x); // CAN observe the 20
}
`````

## Settled


`````js filename=intro
let x /*:number*/ = 10;
if ($) {
  x = 20;
} else {
  $(10);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 10;
if ($) {
  x = 20;
} else {
  $(10);
}
$(x);
`````

## Pre Normal


`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      x = 20;
      break foo;
    }
    $(x);
  }
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = 10;
foo: {
  if ($) {
    x = 20;
    break foo;
  } else {
    $(x);
  }
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 10;
if ($) {
  a = 20;
}
else {
  $( 10 );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
