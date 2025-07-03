# Preval test case

# string_raw_call_ctx_4args.md

> Builtins cases > Ai string > String raw call ctx 4args
>
> Test String.raw called with .call and 4 arguments (template object, 3 substitutions), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {qux: 4};
const template = {raw: ["1", "2", "3", "4"]};
const result = String.raw.call(ctx, template, "a", "b", "c");
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
const ctx = { qux: 4 };
const tmpObjLitVal = [`1`, `2`, `3`, `4`];
const template = { raw: tmpObjLitVal };
const tmpMCOO = $String_raw;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, template, `a`, `b`, `c`);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
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
