# Preval test case

# simple2.md

> Regex > Dotcall > Simple2
>
> Trying to prevent $dotCall for regex method calls

## Input

`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const tmpCallObj /*:regex*/ = /foo/;
const tmpCalleeParam /*:unknown*/ = tmpCallObj.test(arg);  // <-- this is a bool tho?
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const tmpCallObj /*:regex*/ = /foo/;
const tmpCalleeParam /*:unknown*/ = $dotCall($regex_test, tmpCallObj, `test`, arg);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = $(`give food`);
$($dotCall($regex_test, /foo/, `test`, arg));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "give food" );
const b = /foo/;
const c = $dotCall( $regex_test, b, "test", a );
$( c );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $regex_test


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'give food'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
