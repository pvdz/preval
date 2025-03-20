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
const tmpCalleeParam$1 /*:unknown*/ = $(`x`);
const tmpCallObj /*:regex*/ = /x/g;
const tmpCalleeParam /*:unknown*/ = tmpCallObj.test(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(`x`);
$(/x/g.test(tmpCalleeParam$1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = /x/g;
const c = b.test( a );
$( c );
`````


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
