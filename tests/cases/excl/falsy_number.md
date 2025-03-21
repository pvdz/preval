# Preval test case

# falsy_number.md

> Excl > Falsy number
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
const x = (1*$(1));
if (x) {
  $(!x);
} else {
  // Here x is falsy, whatever it is, so !x must be true.
  $(!x);
}
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpBool /*:boolean*/ = !x;
$(tmpBool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
$(!x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = !b;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
