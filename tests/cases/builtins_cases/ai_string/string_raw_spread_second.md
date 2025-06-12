# Preval test case

# string_raw_spread_second.md

> Builtins cases > Ai string > String raw spread second
>
> Test String.raw called with spread arguments as second argument (should be treated as substitutions)

## Input

`````js filename=intro
const template = {raw: ["x", "y", "z"]};
const extra = ["A", "B"];
const result = String.raw(template, ...extra);
$(result); // Expected: "xAyBz"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`x`, `y`, `z`];
const template /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(template, `A`, `B`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`x`, `y`, `z`];
$($String_raw({ raw: tmpObjLitVal }, `A`, `B`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "x", "y", "z" ];
const b = { raw: a };
const c = $String_raw( b, "A", "B" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [`x`, `y`, `z`];
const template = { raw: tmpObjLitVal };
const extra = [`A`, `B`];
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
 - 1: 'xAyBz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
