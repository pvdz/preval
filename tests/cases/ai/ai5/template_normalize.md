# Preval test case

# template_normalize.md

> Ai > Ai5 > Template normalize
>
> Test normalization of template literals to string concatenation

## Input

`````js filename=intro
const x = "hello";
const y = "world";
const z = `${x} ${y}`;
$(z);

// Expected:
// const x = "hello";
// const y = "world";
// const z = x + " " + y;
// $(z);
`````


## Settled


`````js filename=intro
$(`hello world`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello world`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "hello world" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = `hello`;
const y = `world`;
const tmpBinBothLhs$1 = ``;
const tmpBinBothRhs$1 = $coerce(x, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR} `;
const tmpBinBothRhs = $coerce(y, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const z = $coerce(tmpBinLhs, `plustr`);
$(z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
