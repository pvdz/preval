# Preval test case

# string_substring_spread_second_4args.md

> Builtins cases > Ai string > String substring spread second 4args
>
> Test String.prototype.substring called directly with spread as second argument (4 values)

## Input

`````js filename=intro
const str = $("hello world");
const arg1 = 0;
const args = [5, "extra1", "extra2", "extra3"];
const result = str.substring(arg1, ...args);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.substring;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `substring`, 0, 5, `extra1`, `extra2`, `extra3`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.substring(0, 5, `extra1`, `extra2`, `extra3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.substring;
const c = $dotCall( b, a, "substring", 0, 5, "extra1", "extra2", "extra3" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const arg1 = 0;
const args = [5, `extra1`, `extra2`, `extra3`];
const tmpMCF = str.substring;
const result = $dotCall(tmpMCF, str, `substring`, arg1, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
