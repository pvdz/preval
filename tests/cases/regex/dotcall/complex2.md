# Preval test case

# complex2.md

> Regex > Dotcall > Complex2
>
> Trying to prevent $dotCall for regex method calls

## Input

`````js filename=intro
const arg = $(`give food`);
const f = $regex_test;
const regex /*:regex*/ = /foo/;
const tmpCalleeParam$5 /*:object*/ = { some: `stuff` };
$dotCall(f, regex, 'test', arg, tmpCalleeParam$5);
`````


## Settled


`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const regex /*:regex*/ = new $regex_constructor(`foo`, ``);
const tmpCalleeParam$5 /*:object*/ = { some: `stuff` };
$dotCall($regex_test, regex, `test`, arg, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = $(`give food`);
$dotCall($regex_test, new $regex_constructor(`foo`, ``), `test`, arg, { some: `stuff` });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "give food" );
const b = new $regex_constructor( "foo", "" );
const c = { some: "stuff" };
$dotCall( $regex_test, b, "test", a, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arg = $(`give food`);
const f = $regex_test;
const regex = new $regex_constructor(`foo`, ``);
const tmpCalleeParam$5 = { some: `stuff` };
$dotCall(f, regex, `test`, arg, tmpCalleeParam$5);
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
