# Preval test case

# global_call_prop.md

> Normalize > Nullish > Global call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt(15)??foo);
`````

## Settled


`````js filename=intro
$(15);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(15);
`````

## Pre Normal


`````js filename=intro
$(parseInt(15) ?? foo);
`````

## Normalized


`````js filename=intro
let tmpCalleeParam = 15;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = foo;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 15 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
