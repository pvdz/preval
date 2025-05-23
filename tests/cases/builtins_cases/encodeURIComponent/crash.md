# Preval test case

# crash.md

> Builtins cases > EncodeURIComponent > Crash
>
> straight from mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

## Input

`````js filename=intro
$(encodeURIComponent("\uD800\uDFFF"));
$(encodeURIComponent("\uD800"));
$(encodeURIComponent("\uDFFF"));
`````


## Settled


`````js filename=intro
$(`%F0%90%8F%BF`);
const tmpCalleeParam$1 /*:string*/ = encodeURIComponent(`\ud800`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:string*/ = encodeURIComponent(`\udfff`);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`%F0%90%8F%BF`);
$(encodeURIComponent(`\ud800`));
$(encodeURIComponent(`\udfff`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "%F0%90%8F%BF" );
const a = encodeURIComponent( "\ud800" );
$( a );
const b = encodeURIComponent( "\udfff" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = encodeURIComponent(`\ud800\udfff`);
$(tmpCalleeParam);
let tmpCalleeParam$1 = encodeURIComponent(`\ud800`);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = encodeURIComponent(`\udfff`);
$(tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '%F0%90%8F%BF'
 - eval returned: ('<crash[ URI malformed ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
