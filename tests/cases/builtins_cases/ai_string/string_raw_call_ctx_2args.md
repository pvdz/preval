# Preval test case

# string_raw_call_ctx_2args.md

> Builtins cases > Ai string > String raw call ctx 2args
>
> Test String.raw called with .call and 2 arguments (template object, 1 substitution), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {bar: 2};
const template = {raw: ["a", "b"]};
const result = String.raw.call(ctx, template, 42);
$(result); // Expected: "a42b"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`a`, `b`];
const template /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(template, 42);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`a`, `b`];
$($String_raw({ raw: tmpObjLitVal }, 42));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b" ];
const b = { raw: a };
const c = $String_raw( b, 42 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = { bar: 2 };
const tmpObjLitVal = [`a`, `b`];
const template = { raw: tmpObjLitVal };
const tmpMCOO = $String_raw;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, template, 42);
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
 - 1: 'a42b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
