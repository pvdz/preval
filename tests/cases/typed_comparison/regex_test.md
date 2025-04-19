# Preval test case

# regex_test.md

> Typed comparison > Regex test
>
> Regex test should be inlined with the builtin symbol

## Input

`````js filename=intro
$(/x/g.test($('x')));
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $(`x`);
const tmpMCOO /*:regex*/ = /x/g;
const tmpCalleeParam /*:unknown*/ = $dotCall($regex_test, tmpMCOO, `test`, tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = $(`x`);
$($dotCall($regex_test, /x/g, `test`, tmpMCP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = /x/g;
const c = $dotCall( $regex_test, b, "test", a );
$( c );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $regex_test


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
