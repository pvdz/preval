# Preval test case

# string_bold_direct_0args.md

> Builtins cases > Ai string > String bold direct 0args
>
> Test String.prototype.bold called directly with 0 arguments; should wrap string in <b> tags

## Input

`````js filename=intro
const str = $("hello world");
const result = str.bold();
$(result); // Expected: "<b>hello world</b>"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.bold;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `bold`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.bold());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.bold;
const c = $dotCall( b, a, "bold" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.bold;
const result = $dotCall(tmpMCF, str, `bold`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: '<b>hello world</b>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
