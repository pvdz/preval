# Preval test case

# array_hole_sum_nan.md

> Math > Ai > Array hole sum nan
>
> Summing array with explicit NaN and hole

## Input

`````js filename=intro
const arr = [0.1, NaN, , 0.2];
let sum = 0;
for (let i = 0; i < arr.length; i++) sum += arr[i] || 0;
$(sum);
// Should be NaN

// Number.parseInt and Number.parseFloat edge cases
const a = $(Number.parseInt("0x10"));
const b = $(Number.parseInt("010", 8));
const c = $(Number.parseFloat("1.23e2"));
const d = $(Number.parseFloat("foo"));
$(a);
$(b);
$(c);
$(d);
// Should be 16, 8, 123, NaN
`````


## Settled


`````js filename=intro
$(0.30000000000000004);
const a /*:unknown*/ = $(16);
const b /*:unknown*/ = $(8);
const c /*:unknown*/ = $(123);
const d /*:unknown*/ = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.30000000000000004);
const a = $(16);
const b = $(8);
const c = $(123);
const d = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.30000000000000004 );
const a = $( 16 );
const b = $( 8 );
const c = $( 123 );
const d = $( $Number_NaN );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [0.1, NaN, , 0.2];
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
const tmpMCF = $Number_parseInt;
let tmpCalleeParam = 16;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Number_parseInt;
let tmpCalleeParam$1 = 8;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Number_parseFloat;
let tmpCalleeParam$3 = 123;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Number_parseFloat;
let tmpCalleeParam$5 = NaN;
const d = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.30000000000000004
 - 2: 16
 - 3: 8
 - 4: 123
 - 5: NaN
 - 6: 16
 - 7: 8
 - 8: 123
 - 9: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
