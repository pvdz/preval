# Preval test case

# string_valueOf_direct_4args.md

> Builtins cases > Ai string > String valueOf direct 4args
>
> Test String.prototype.valueOf called directly with 4 arguments; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = str.valueOf("extra1", "extra2", "extra3", "extra4");
$(result); // Expected: "hello world"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.valueOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `valueOf`, `extra1`, `extra2`, `extra3`, `extra4`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.valueOf(`extra1`, `extra2`, `extra3`, `extra4`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.valueOf;
const c = $dotCall( b, a, "valueOf", "extra1", "extra2", "extra3", "extra4" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.valueOf;
const result = $dotCall(tmpMCF, str, `valueOf`, `extra1`, `extra2`, `extra3`, `extra4`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 'hello world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
