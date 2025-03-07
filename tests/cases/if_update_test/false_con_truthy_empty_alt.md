# Preval test case

# false_con_truthy_empty_alt.md

> If update test > False con truthy empty alt
>
> Fold up back-to-back Ifs when the first mutate the tests of the second

## Input

`````js filename=intro
let x = false;
if ($) {
  x = true;
} else {
}
if (x) {
  $(3);
} else {
}
`````

## Settled


`````js filename=intro
if ($) {
  $(3);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(3);
}
`````

## Pre Normal


`````js filename=intro
let x = false;
if ($) {
  x = true;
} else {
}
if (x) {
  $(3);
} else {
}
`````

## Normalized


`````js filename=intro
let x = false;
if ($) {
  x = true;
} else {
}
if (x) {
  $(3);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
