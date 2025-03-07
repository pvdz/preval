# Preval test case

# base_boolean_true.md

> If bool > Base boolean true
>
> When the if-test is the arg to Boolean or bang then the value can be predicted

## Input

`````js filename=intro
const x = $(1);
if (x) {
  $(Boolean(x)); // $(true)!
}
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(true);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(true);
}
`````

## Pre Normal


`````js filename=intro
const x = $(1);
if (x) {
  $(Boolean(x));
}
`````

## Normalized


`````js filename=intro
const x = $(1);
if (x) {
  const tmpCalleeParam = Boolean(x);
  $(tmpCalleeParam);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( true );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
