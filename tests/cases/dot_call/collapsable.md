# Preval test case

# collapsable.md

> Dot call > Collapsable
>
> This can be collapsed safely because the regex decl could not possibly affect
> str, meaning the .replace method is still available by the time it gets called.

## Input

`````js filename=intro
const str = $('hello');
const method = str.replace;
const regex = /e/g;
const out = $dotCall(method, str, 'replace', regex, `u`);
$(out);
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const regex /*:regex*/ = /e/g;
const out /*:unknown*/ = str.replace(regex, `u`);
$(out);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.replace(/e/g, `u`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = /e/g;
const c = a.replace( b, "u" );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'hullo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
