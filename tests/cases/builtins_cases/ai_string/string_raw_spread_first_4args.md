# Preval test case

# string_raw_spread_first_4args.md

> Builtins cases > Ai string > String raw spread first 4args
>
> Test String.raw called with spread arguments (array with 4 elements: template object and 3 substitutions)

## Input

`````js filename=intro
const args = [{raw: ["a", "b", "c", "d"]}, 1, 2, 3];
const result = String.raw(...args);
$(result); // Expected: "a1b2c3d"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`a`, `b`, `c`, `d`];
const tmpArrElement /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(tmpArrElement, 1, 2, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`a`, `b`, `c`, `d`];
$($String_raw({ raw: tmpObjLitVal }, 1, 2, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d" ];
const b = { raw: a };
const c = $String_raw( b, 1, 2, 3 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [`a`, `b`, `c`, `d`];
const tmpArrElement = { raw: tmpObjLitVal };
const args = [tmpArrElement, 1, 2, 3];
const tmpMCF = $String_raw;
const result = $String_raw(...args);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a1b2c3d'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
