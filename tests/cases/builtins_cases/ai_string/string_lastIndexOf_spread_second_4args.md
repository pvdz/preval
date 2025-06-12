# Preval test case

# string_lastIndexOf_spread_second_4args.md

> Builtins cases > Ai string > String lastIndexOf spread second 4args
>
> Test String.prototype.lastIndexOf called directly with spread as second argument (4 values)

## Input

`````js filename=intro
const str = $("hello world");
const arg1 = "o";
const args = [6, "extra1", "extra2", "extra3"];
const result = str.lastIndexOf(arg1, ...args);
$(result); // Expected: 4
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.lastIndexOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `lastIndexOf`, `o`, 6, `extra1`, `extra2`, `extra3`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.lastIndexOf(`o`, 6, `extra1`, `extra2`, `extra3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.lastIndexOf;
const c = $dotCall( b, a, "lastIndexOf", "o", 6, "extra1", "extra2", "extra3" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const arg1 = `o`;
const args = [6, `extra1`, `extra2`, `extra3`];
const tmpMCF = str.lastIndexOf;
const result = $dotCall(tmpMCF, str, `lastIndexOf`, arg1, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
