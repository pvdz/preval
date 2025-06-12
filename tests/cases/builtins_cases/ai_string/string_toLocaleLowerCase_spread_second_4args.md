# Preval test case

# string_toLocaleLowerCase_spread_second_4args.md

> Builtins cases > Ai string > String toLocaleLowerCase spread second 4args
>
> Test String.prototype.toLocaleLowerCase called with spread arguments as second argument (4 elements, only first used, rest ignored)

## Input

`````js filename=intro
const str = $("HELLO");
const arg1 = "en-US";
const extra = [1, 2, 3, 4];
const result = str.toLocaleLowerCase(arg1, ...extra);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`HELLO`);
const tmpMCF /*:unknown*/ = str.toLocaleLowerCase;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toLocaleLowerCase`, `en-US`, 1, 2, 3, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`HELLO`);
$(str.toLocaleLowerCase(`en-US`, 1, 2, 3, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "HELLO" );
const b = a.toLocaleLowerCase;
const c = $dotCall( b, a, "toLocaleLowerCase", "en-US", 1, 2, 3, 4 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`HELLO`);
const arg1 = `en-US`;
const extra = [1, 2, 3, 4];
const tmpMCF = str.toLocaleLowerCase;
const result = $dotCall(tmpMCF, str, `toLocaleLowerCase`, arg1, ...extra);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'HELLO'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
