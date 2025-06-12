# Preval test case

# string_replaceAll_spread_second_4args.md

> Builtins cases > Ai string > String replaceAll spread second 4args
>
> Test String.prototype.replaceAll called with spread arguments as second argument (4 elements, only first used, rest ignored)

## Input

`````js filename=intro
const str = $("hello");
const arg1 = "l";
const extra = ["x", 1, 2, 3];
const result = str.replaceAll(arg1, ...extra);
$(result); // Expected: "hexxo"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.replaceAll;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `replaceAll`, `l`, `x`, 1, 2, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.replaceAll(`l`, `x`, 1, 2, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.replaceAll;
const c = $dotCall( b, a, "replaceAll", "l", "x", 1, 2, 3 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const arg1 = `l`;
const extra = [`x`, 1, 2, 3];
const tmpMCF = str.replaceAll;
const result = $dotCall(tmpMCF, str, `replaceAll`, arg1, ...extra);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'hexxo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
