# Preval test case

# complex.md

> Regex > Dotcall > Complex
>
> Trying to prevent $dotCall for regex method calls

## Input

`````js filename=intro
const arg = $('give food');
const regex = /foo/;
const f = regex.test;
$dotCall(f, regex, 'test', arg, {some: 'stuff'});
`````


## Settled


`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const regex /*:regex*/ = /foo/;
const tmpCalleeParam$1 /*:object*/ = { some: `stuff` };
$dotCall($regex_test, regex, `test`, arg, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($regex_test, /foo/, `test`, $(`give food`), { some: `stuff` });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "give food" );
const b = /foo/;
const c = { some: "stuff" };
$dotCall( $regex_test, b, "test", a, c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'give food'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
