# Preval test case

# simple.md

> Regex > Dotcall > Simple
>
> Trying to prevent $dotCall for regex method calls

## Input

`````js filename=intro
const arg = $('give food');
$(/foo/.test(arg));
`````

## Settled


`````js filename=intro
const arg /*:unknown*/ = $(`give food`);
const tmpCallObj /*:regex*/ = /foo/;
const tmpCalleeParam /*:unknown*/ = tmpCallObj.test(arg);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = $(`give food`);
$(/foo/.test(arg));
`````

## Pre Normal


`````js filename=intro
const arg = $(`give food`);
$(/foo/.test(arg));
`````

## Normalized


`````js filename=intro
const arg = $(`give food`);
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(arg);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "give food" );
const b = /foo/;
const c = b.test( a );
$( c );
`````

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
