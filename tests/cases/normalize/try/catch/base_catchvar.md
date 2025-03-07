# Preval test case

# base_catchvar.md

> Normalize > Try > Catch > Base catchvar
>
> The catch var is a special kinda binding

## Input

`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
}
$(3);
`````

## Settled


`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
}
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
}
$(3);
`````

## Pre Normal


`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
}
$(3);
`````

## Normalized


`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
}
$(3);
`````

## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
}
catch (a) {
  $( 2 );
}
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
