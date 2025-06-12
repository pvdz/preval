# Preval test case

# string_bold_spread_first_4args.md

> Builtins cases > Ai string > String bold spread first 4args
>
> Test String.prototype.bold called directly with spread as first argument (4 values, all ignored)

## Input

`````js filename=intro
const str = $("hello world");
const args = ["extra1", "extra2", "extra3", "extra4"];
const result = str.bold(...args);
$(result); // Expected: "<b>hello world</b>"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.bold;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `bold`, `extra1`, `extra2`, `extra3`, `extra4`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.bold(`extra1`, `extra2`, `extra3`, `extra4`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.bold;
const c = $dotCall( b, a, "bold", "extra1", "extra2", "extra3", "extra4" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [`extra1`, `extra2`, `extra3`, `extra4`];
const tmpMCF = str.bold;
const result = $dotCall(tmpMCF, str, `bold`, ...args);
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
