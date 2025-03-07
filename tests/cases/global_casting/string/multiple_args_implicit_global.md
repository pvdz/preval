# Preval test case

# multiple_args_implicit_global.md

> Global casting > String > Multiple args implicit global
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = ''+a;
const y = String(x, $, 1, fail_hard, "twee");
$(y);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const x /*:string*/ = $coerce(a, `plustr`);
fail_hard;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(`a`), `plustr`);
fail_hard;
$(x);
`````

## Pre Normal


`````js filename=intro
const a = $(`a`);
const x = `` + a;
const y = String(x, $, 1, fail_hard, `twee`);
$(y);
`````

## Normalized


`````js filename=intro
const a = $(`a`);
const x = $coerce(a, `plustr`);
const tmpArgOverflow = x;
fail_hard;
const tmpStringFirstArg = tmpArgOverflow;
const y = $coerce(tmpStringFirstArg, `string`);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $coerce( a, "plustr" );
fail_hard;
$( b );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail_hard

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
