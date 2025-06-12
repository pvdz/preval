# Preval test case

# string_raw_call_ctx_3args.md

> Builtins cases > Ai string > String raw call ctx 3args
>
> Test String.raw called with .call and 3 arguments (template object, 2 substitutions), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {baz: 3};
const template = {raw: ["x", "y", "z"]};
const result = String.raw.call(ctx, template, "A", "B");
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
const ctx = { baz: 3 };
const tmpObjLitVal = [`x`, `y`, `z`];
const template = { raw: tmpObjLitVal };
const tmpMCOO = $String_raw;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, template, `A`, `B`);
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
 - 1: 'xAyBz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
