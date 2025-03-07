# Preval test case

# labeled_break3.md

> Assigns > Labeled break3
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
    } else {
      x = 30;
    }
    $(x); // can observe only the 30
  }
  $(x); // CAN observe the 20 or 30 but not the 10
}
`````

## Settled


`````js filename=intro
let x /*:number*/ = 20;
if ($) {
} else {
  x = 30;
  $(30);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 20;
if (!$) {
  x = 30;
  $(30);
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
    } else {
      x = 30;
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
    x = 30;
    $(x);
  }
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 20;
if ($) {

}
else {
  a = 30;
  $( 30 );
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
