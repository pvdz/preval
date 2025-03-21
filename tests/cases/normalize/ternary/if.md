# Preval test case

# if.md

> Normalize > Ternary > If
>
> Example of rewriting an if with ternary

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
if ( a ? b : c) $(100);
else $(200);
`````

## Settled


`````js filename=intro
$(100);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  c = 3;
if (a ? b : c) $(100);
else $(200);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let tmpIfTest = undefined;
if (a) {
  tmpIfTest = b;
} else {
  tmpIfTest = c;
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
