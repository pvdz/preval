# Preval test case

# sparse_array_sum.md

> Math > Ai > Sparse array sum
>
> Summing a sparse array with a hole

## Input

`````js filename=intro
const arr = [0.1, , 0.2];
let sum = 0;
for (let i = 0; i < arr.length; i++) sum += arr[i] || 0;
$(sum);
// Should be 0.3, not NaN
`````


## Settled


`````js filename=intro
$(0.30000000000000004);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.30000000000000004);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.30000000000000004 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [0.1, , 0.2];
let sum = 0;
let i = 0;
while (true) {
  const tmpBinBothLhs = i;
  const tmpBinBothRhs = arr.length;
  const tmpIfTest = tmpBinBothLhs < tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpBinBothLhs$1 = sum;
    let tmpBinBothRhs$1 = arr[i];
    if (tmpBinBothRhs$1) {
    } else {
      tmpBinBothRhs$1 = 0;
    }
    sum = tmpBinBothLhs$1 + tmpBinBothRhs$1;
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
 - 1: 0.30000000000000004
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
