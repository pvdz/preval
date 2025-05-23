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
const method /*:unknown*/ = str.replace;
const regex /*:regex*/ = new $regex_constructor(`e`, `g`);
const out /*:unknown*/ = $dotCall(method, str, `replace`, regex, `u`);
$(out);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
const method = str.replace;
$($dotCall(method, str, `replace`, new $regex_constructor(`e`, `g`), `u`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.replace;
const c = new $regex_constructor( "e", "g" );
const d = $dotCall( b, a, "replace", c, "u" );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const method = str.replace;
const regex = new $regex_constructor(`e`, `g`);
const out = $dotCall(method, str, `replace`, regex, `u`);
$(out);
`````


## Todos triggered


None


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
