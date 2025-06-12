# Preval test case

# string_raw_spread_second_4args.md

> Builtins cases > Ai string > String raw spread second 4args
>
> Test String.raw called with spread arguments as second argument (4 elements: all used as substitutions)

## Input

`````js filename=intro
const template = {raw: ["1", "2", "3", "4", "5"]};
const extra = ["a", "b", "c", "d"];
const result = String.raw(template, ...extra);
$(result); // Expected: "1a2b3c4d5"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`1`, `2`, `3`, `4`, `5`];
const template /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(template, `a`, `b`, `c`, `d`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`1`, `2`, `3`, `4`, `5`];
$($String_raw({ raw: tmpObjLitVal }, `a`, `b`, `c`, `d`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "1", "2", "3", "4", "5" ];
const b = { raw: a };
const c = $String_raw( b, "a", "b", "c", "d" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [`1`, `2`, `3`, `4`, `5`];
const template = { raw: tmpObjLitVal };
const extra = [`a`, `b`, `c`, `d`];
const tmpMCF = $String_raw;
const result = $String_raw(template, ...extra);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1a2b3c4d5'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
