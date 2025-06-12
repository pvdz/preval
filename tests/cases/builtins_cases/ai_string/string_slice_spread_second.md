# Preval test case

# string_slice_spread_second.md

> Builtins cases > Ai string > String slice spread second
>
> Test String.prototype.slice called directly with spread as second argument (3 values)

## Input

`````js filename=intro
const str = $("hello world");
const arg1 = 0;
const args = [5, "extra", "extra2"];
const result = str.slice(arg1, ...args);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.slice;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `slice`, 0, 5, `extra`, `extra2`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.slice(0, 5, `extra`, `extra2`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.slice;
const c = $dotCall( b, a, "slice", 0, 5, "extra", "extra2" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const arg1 = 0;
const args = [5, `extra`, `extra2`];
const tmpMCF = str.slice;
const result = $dotCall(tmpMCF, str, `slice`, arg1, ...args);
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
