# Preval test case

# string_slice_spread_first.md

> Builtins cases > Ai string > String slice spread first
>
> Test String.prototype.slice called directly with spread as first argument (3 values)

## Input

`````js filename=intro
const str = $("hello world");
const args = [0, 5, "extra"];
const result = str.slice(...args);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.slice;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `slice`, 0, 5, `extra`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.slice(0, 5, `extra`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.slice;
const c = $dotCall( b, a, "slice", 0, 5, "extra" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [0, 5, `extra`];
const tmpMCF = str.slice;
const result = $dotCall(tmpMCF, str, `slice`, ...args);
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
