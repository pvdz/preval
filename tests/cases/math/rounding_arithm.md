# Preval test case

# rounding_arithm.md

> Math > Rounding arithm
>
> If Preval rewrites arithmetic expressions, it could introduce rounding errors.

## Input

`````js filename=intro
let sum = 0;
for (let i = 0; i < 1e1; i++) sum += 1e-16;
$(sum); // Should be 1e-10, but may be off by a few LSBs
`````


## Settled


`````js filename=intro
$(1.0000000000000003e-15);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.0000000000000003e-15);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.0000000000000003e-15 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let sum = 0;
let i = 0;
while (true) {
  const tmpIfTest = i < 10;
  if (tmpIfTest) {
    sum = sum + 1e-16;
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
$(sum);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.0000000000000003e-15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
