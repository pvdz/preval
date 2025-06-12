# Preval test case

# string_trimStart_spread_first_4args.md

> Builtins cases > Ai string > String trimStart spread first 4args
>
> Test String.prototype.trimStart called with spread arguments (array with 4 elements, all ignored)

## Input

`````js filename=intro
const str = $("   hello");
const args = [1, 2, 3, 4];
const result = str.trimStart(...args);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`   hello`);
const tmpMCF /*:unknown*/ = str.trimStart;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `trimStart`, 1, 2, 3, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`   hello`);
$(str.trimStart(1, 2, 3, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "   hello" );
const b = a.trimStart;
const c = $dotCall( b, a, "trimStart", 1, 2, 3, 4 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`   hello`);
const args = [1, 2, 3, 4];
const tmpMCF = str.trimStart;
const result = $dotCall(tmpMCF, str, `trimStart`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ' hello'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
