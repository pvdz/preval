# Preval test case

# string_replace_spread_first_4args.md

> Builtins cases > Ai string > String replace spread first 4args
>
> Test String.prototype.replace called with spread arguments (array with 4 elements, only first two used)

## Input

`````js filename=intro
const str = $("hello");
const args = ["l", "x", 1, 2];
const result = str.replace(...args);
$(result); // Expected: "hexlo"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.replace;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `replace`, `l`, `x`, 1, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.replace(`l`, `x`, 1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.replace;
const c = $dotCall( b, a, "replace", "l", "x", 1, 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const args = [`l`, `x`, 1, 2];
const tmpMCF = str.replace;
const result = $dotCall(tmpMCF, str, `replace`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'hexlo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
