# Preval test case

# unused_label_loop.md

> Labels > Unused label loop
>
> Labels should not throw

## Input

`````js filename=intro
let x = 2;
foo: while (--x) $(x);
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
let x = 2;
foo: while (--x) $(x);
`````

## Normalized


`````js filename=intro
let x = 2;
while (true) {
  const tmpPostUpdArgIdent = $coerce(x, `number`);
  x = tmpPostUpdArgIdent - 1;
  const tmpIfTest = x;
  if (tmpIfTest) {
    $(x);
  } else {
    break;
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
