# Preval test case

# labeled_break4.md

> Assigns > Labeled break4
>
> Breaking to labels may be funky for ref tracking

## Input

`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      break foo;
    } else {
      x = 20;
    }
    $(x); // can observe only the 20
  }
  $(x); // CAN observe the 10, 20
}
`````

## Settled


`````js filename=intro
let x /*:number*/ = 10;
if ($) {
} else {
  x = 20;
  $(20);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 10;
if (!$) {
  x = 20;
  $(20);
}
$(x);
`````

## Pre Normal


`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      break foo;
    } else {
      x = 20;
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
    break foo;
  } else {
    x = 20;
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

}
else {
  a = 20;
  $( 20 );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
