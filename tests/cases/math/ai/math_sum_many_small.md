# Preval test case

# math_sum_many_small.md

> Math > Ai > Math sum many small
>
> Summing many small numbers for accumulated error

## Input

`````js filename=intro
let sum = 0;
for (let i = 0; i < 1e2; i++) sum += 1e-10;
$(sum);
// Should be close to 0.1
`````


## Settled


`````js filename=intro
$(9.999999999999985e-9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(9.999999999999985e-9);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 9.999999999999985e-9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let sum = 0;
let i = 0;
while (true) {
  const tmpIfTest = i < 100;
  if (tmpIfTest) {
    sum = sum + 1e-10;
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
 - 1: 9.999999999999985e-9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
