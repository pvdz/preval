# Preval test case

# string_raw_call_ctx_spread.md

> Builtins cases > Ai string > String raw call ctx spread
>
> Test String.raw called with .call and spread arguments (array with 2 elements: template object and 1 substitution), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {ignore: true};
const args = [{raw: ["foo", "bar"]}, 42];
const result = String.raw.call(ctx, ...args);
$(result); // Expected: "foo42bar"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`foo`, `bar`];
const tmpArrElement /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(tmpArrElement, 42);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`foo`, `bar`];
$($String_raw({ raw: tmpObjLitVal }, 42));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "foo", "bar" ];
const b = { raw: a };
const c = $String_raw( b, 42 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = { ignore: true };
const tmpObjLitVal = [`foo`, `bar`];
const tmpArrElement = { raw: tmpObjLitVal };
const args = [tmpArrElement, 42];
const tmpMCOO = $String_raw;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo42bar'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
