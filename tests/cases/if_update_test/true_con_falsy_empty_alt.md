# Preval test case

# true_con_falsy_empty_alt.md

> If update test > True con falsy empty alt
>
> Fold up back-to-back Ifs when the first mutate the tests of the second

## Input

`````js filename=intro
let x = true;
if ($) {
  x = false;
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
} else {
  $(3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$) {
  $(3);
}
`````

## Pre Normal


`````js filename=intro
let x = true;
if ($) {
  x = false;
} else {
}
if (x) {
  $(3);
} else {
}
`````

## Normalized


`````js filename=intro
let x = true;
if ($) {
  x = false;
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

}
else {
  $( 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
