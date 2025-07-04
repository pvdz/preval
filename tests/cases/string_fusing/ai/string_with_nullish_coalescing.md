# Preval test case

# string_with_nullish_coalescing.md

> String fusing > Ai > String with nullish coalescing
>
> Test string concatenation with nullish coalescing

## Input

`````js filename=intro
const value = null;
const fallback = $("fallback");
const result = "value: " + (value ?? fallback);
$(result);
`````


## Settled


`````js filename=intro
const fallback /*:unknown*/ = $(`fallback`);
const tmpClusterSSA_tmpStringConcatL /*:string*/ = $coerce(fallback, `plustr`);
const result /*:string*/ /*truthy*/ = `value: ${tmpClusterSSA_tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpStringConcatL = $(`fallback`) + ``;
$(`value: ${tmpClusterSSA_tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "fallback" );
const b = $coerce( a, "plustr" );
const c = `value: ${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const value = null;
const fallback = $(`fallback`);
const tmpBinBothLhs = `value: `;
let tmpBinBothRhs = value;
const tmpIfTest = tmpBinBothRhs == null;
if (tmpIfTest) {
  tmpBinBothRhs = fallback;
} else {
}
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'fallback'
 - 2: 'value: fallback'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
