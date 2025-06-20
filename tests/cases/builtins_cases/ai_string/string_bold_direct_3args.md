# Preval test case

# string_bold_direct_3args.md

> Builtins cases > Ai string > String bold direct 3args
>
> Test String.prototype.bold called directly with 3 arguments; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = str.bold("extra1", "extra2", "extra3");
$(result); // Expected: "<b>hello world</b>"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.bold;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `bold`, `extra1`, `extra2`, `extra3`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.bold(`extra1`, `extra2`, `extra3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.bold;
const c = $dotCall( b, a, "bold", "extra1", "extra2", "extra3" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.bold;
const result = $dotCall(tmpMCF, str, `bold`, `extra1`, `extra2`, `extra3`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: '<b>hello world</b>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
