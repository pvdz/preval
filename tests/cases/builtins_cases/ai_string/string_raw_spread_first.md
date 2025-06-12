# Preval test case

# string_raw_spread_first.md

> Builtins cases > Ai string > String raw spread first
>
> Test String.raw called with spread arguments (array with 1 element: template object, no substitutions)

## Input

`````js filename=intro
const args = [{raw: ["foo"]}];
const result = String.raw(...args);
$(result); // Expected: "foo"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`foo`];
const tmpArrElement /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(tmpArrElement);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`foo`];
$($String_raw({ raw: tmpObjLitVal }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "foo" ];
const b = { raw: a };
const c = $String_raw( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = [`foo`];
const tmpArrElement = { raw: tmpObjLitVal };
const args = [tmpArrElement];
const tmpMCF = $String_raw;
const result = $String_raw(...args);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
