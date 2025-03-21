# Preval test case

# base_var.md

> If update var > Base var
>
> Real base that is not optimized away rn

## Input

`````js filename=intro
let x = 1;
if ($) {
  x = 0;
} else {
  x = 0;
}
const tmpCallCallee = $;
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(`prevent inlining`);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(`prevent inlining`);
const tmpCalleeParam /*:primitive*/ = 0 + tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(`prevent inlining`);
$(0 + tmpBinBothRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "prevent inlining" );
const b = 0 + a;
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prevent inlining'
 - 2: '0prevent inlining'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
