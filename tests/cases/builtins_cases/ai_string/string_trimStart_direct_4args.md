# Preval test case

# string_trimStart_direct_4args.md

> Builtins cases > Ai string > String trimStart direct 4args
>
> Test String.prototype.trimStart called directly with 4 arguments (should ignore extra arguments)

## Input

`````js filename=intro
const str = $("   padded   ");
const result = str.trimStart(1, 2, 3, 4);
$(result); // Expected: "padded   "
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`   padded   `);
const tmpMCF /*:unknown*/ = str.trimStart;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `trimStart`, 1, 2, 3, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`   padded   `);
$(str.trimStart(1, 2, 3, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "   padded   " );
const b = a.trimStart;
const c = $dotCall( b, a, "trimStart", 1, 2, 3, 4 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`   padded   `);
const tmpMCF = str.trimStart;
const result = $dotCall(tmpMCF, str, `trimStart`, 1, 2, 3, 4);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ' padded '
 - 2: 'padded '
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
