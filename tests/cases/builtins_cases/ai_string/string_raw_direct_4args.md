# Preval test case

# string_raw_direct_4args.md

> Builtins cases > Ai string > String raw direct 4args
>
> Test String.raw called directly with 4 arguments (template object, 3 substitutions)

## Input

`````js filename=intro
const template = {raw: ["1", "2", "3", "4"]};
const result = String.raw(template, "a", "b", "c");
$(result); // Expected: "1a2b3c4"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`1`, `2`, `3`, `4`];
const template /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(template, `a`, `b`, `c`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`1`, `2`, `3`, `4`];
$($String_raw({ raw: tmpObjLitVal }, `a`, `b`, `c`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "1", "2", "3", "4" ];
const b = { raw: a };
const c = $String_raw( b, "a", "b", "c" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [`1`, `2`, `3`, `4`];
const template = { raw: tmpObjLitVal };
const tmpMCF = $String_raw;
const result = $String_raw(template, `a`, `b`, `c`);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1a2b3c4'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
