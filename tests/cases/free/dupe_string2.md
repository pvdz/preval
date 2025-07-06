# Preval test case

# dupe_string2.md

> Free > Dupe string2
>
> Somehow strings are getting duplicated

## Options

- reducersOnly: refTracked

## Input

`````js filename=intro
const data/*:array*/ /*truthy*/ = [`a`, `DUPE`, `c`];
const p/*:string*/ /*truthy*/ = `a`;
$(p);
const tmpReturnArg$3/*:string*/ /*truthy*/ = `DUPE`;
const tmpReturnArg$1/*:string*/ /*truthy*/ = `c`;
const q/*:string*/ /*truthy*/ = tmpReturnArg$3;
const r/*:string*/ /*truthy*/ = tmpReturnArg$1;
const tmpCalleeParam/*:string*/ = `${q}${r}`;
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
$(`a`);
const tmpBinBothRhs$1 /*:string*/ = $coerce(`DUPE`, `string`);
const tmpBinLhs$1 /*:string*/ = $coerce(tmpBinBothRhs$1, `plustr`);
const tmpBinBothLhs /*:string*/ = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothRhs /*:string*/ = $coerce(`c`, `string`);
const tmpBinLhs /*:string*/ = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam /*:string*/ = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
const tmpBinBothLhs = String(`DUPE`) + `` + ``;
$(tmpBinBothLhs + String(`c`) + ``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
const a = $coerce( "DUPE", "string" );
const b = $coerce( a, "plustr" );
const c = $coerce( b, "plustr" );
const d = $coerce( "c", "string" );
const e = c + d;
const f = $coerce( e, "plustr" );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const data = [`a`, `DUPE`, `c`];
const p = `a`;
$(p);
const tmpReturnArg$3 = `DUPE`;
const tmpReturnArg$1 = `c`;
const q = tmpReturnArg$3;
const r = tmpReturnArg$1;
const tmpBinBothLhs$1 = ``;
const tmpBinBothRhs$1 = $coerce(q, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothRhs = $coerce(r, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'DUPEc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
