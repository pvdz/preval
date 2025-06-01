# Preval test case

# ai_rule297_string_replace_all_opaque.md

> Ai > Ai3 > Ai rule297 string replace all opaque
>
> Test: String.prototype.replace with opaque string, opaque searchValue, and opaque replaceValue.

## Input

`````js filename=intro
// Expected: str.replace(search, repl); (or equivalent, call preserved)
let str = $('str', "hello world");
let search = $('search', "world");
let repl = $('repl', "Preval");
let result = $('result', str.replace(search, repl));
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`str`, `hello world`);
const search /*:unknown*/ = $(`search`, `world`);
const repl /*:unknown*/ = $(`repl`, `Preval`);
const tmpMCF /*:unknown*/ = str.replace;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, str, `replace`, search, repl);
$(`result`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`str`, `hello world`);
const search = $(`search`, `world`);
const repl = $(`repl`, `Preval`);
$(`result`, str.replace(search, repl));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "str", "hello world" );
const b = $( "search", "world" );
const c = $( "repl", "Preval" );
const d = a.replace;
const e = $dotCall( d, a, "replace", b, c );
$( "result", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let str = $(`str`, `hello world`);
let search = $(`search`, `world`);
let repl = $(`repl`, `Preval`);
const tmpMCF = str.replace;
let tmpCalleeParam = $dotCall(tmpMCF, str, `replace`, search, repl);
let result = $(`result`, tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'str', 'hello world'
 - 2: 'search', 'world'
 - 3: 'repl', 'Preval'
 - 4: 'result', 'str'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
