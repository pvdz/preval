# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:regex*/ = new $regex_constructor(`foo`, ``);
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpCalleeParam /*:string*/ = `/foo/${tmpStringConcatL}`;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $regex_constructor(`foo`, ``);
const tmpStringConcatL = $coerce($(100), `plustr`);
$(`/foo/${tmpStringConcatL}`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "" );
const b = $( 100 );
const c = $coerce( b, "plustr" );
const d = `/foo/${c}`;
$( d );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = new $regex_constructor(`foo`, ``);
const tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '/foo/100'
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
