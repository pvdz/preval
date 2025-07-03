# Preval test case

# opaque_binary_cache.md

> Ai > Ai5 > Opaque binary cache
>
> Test caching of binary operation results for opaque values

## Input

`````js filename=intro
const x = $("test");
const y = x + "a" + "b";
const z = x + "a" + "c";
$(y + z);

// Expected:
// const x = $("test");
// const tmp = x + "a";
// const y = tmp + "b";
// const z = tmp + "c";
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpStringConcatR /*:string*/ = $coerce(x, `plustr`);
const tmpStringConcatR$3 /*:string*/ = $coerce(x, `plustr`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `${tmpStringConcatR}ab${tmpStringConcatR$3}ac`;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const tmpStringConcatR = x + ``;
const tmpStringConcatR$3 = x + ``;
$(`${tmpStringConcatR}ab${tmpStringConcatR$3}ac`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = $coerce( a, "plustr" );
const c = $coerce( a, "plustr" );
const d = `${b}ab${c}ac`;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpStringConcatR = $coerce(x, `plustr`);
const tmpBinLhs = `${tmpStringConcatR}a`;
const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
const y = `${tmpStringConcatR$1}b`;
const tmpStringConcatR$3 = $coerce(x, `plustr`);
const tmpBinLhs$1 = `${tmpStringConcatR$3}a`;
const tmpStringConcatR$5 = $coerce(tmpBinLhs$1, `plustr`);
const z = `${tmpStringConcatR$5}c`;
let tmpCalleeParam = y + z;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'testabtestac'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
