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
const tmpMCOO /*:regex*/ = new $regex_constructor(`x`, `g`);
const tmpMCP /*:unknown*/ = $(`x`);
const tmpCalleeParam /*:unknown*/ = $dotCall($regex_test, tmpMCOO, `test`, tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = new $regex_constructor(`x`, `g`);
$($dotCall($regex_test, tmpMCOO, `test`, $(`x`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "x", "g" );
const b = $( "x" );
const c = $dotCall( $regex_test, a, "test", b );
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
