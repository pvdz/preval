# Preval test case

# ai_rule293_string_startswith_opaque_receiver_arg.md

> Ai > Ai3 > Ai rule293 string startswith opaque receiver arg
>
> Test: String method startsWith with an opaque receiver and opaque argument.

## Input

`````js filename=intro
// Expected: str.startsWith(prefix); (or equivalent, call preserved)
let str = $('str', "hello_world");
let prefix = $('prefix', "hello");
let result = $('result', str.startsWith(prefix));
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`str`, `hello_world`);
const prefix /*:unknown*/ = $(`prefix`, `hello`);
const tmpMCF /*:unknown*/ = str.startsWith;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, str, `startsWith`, prefix);
$(`result`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`str`, `hello_world`);
const prefix = $(`prefix`, `hello`);
$(`result`, str.startsWith(prefix));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "str", "hello_world" );
const b = $( "prefix", "hello" );
const c = a.startsWith;
const d = $dotCall( c, a, "startsWith", b );
$( "result", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let str = $(`str`, `hello_world`);
let prefix = $(`prefix`, `hello`);
const tmpMCF = str.startsWith;
let tmpCalleeParam = $dotCall(tmpMCF, str, `startsWith`, prefix);
let result = $(`result`, tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'str', 'hello_world'
 - 2: 'prefix', 'hello'
 - 3: 'result', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
