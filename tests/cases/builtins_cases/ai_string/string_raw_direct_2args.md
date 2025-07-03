# Preval test case

# string_raw_direct_2args.md

> Builtins cases > Ai string > String raw direct 2args
>
> Test String.raw called directly with 2 arguments (one substitution)

## Input

`````js filename=intro
const result = String.raw({raw: ["foo", "bar"]}, 42);
$(result); // Expected: "foo42bar"

// Test String.raw called directly with 2 arguments (template object, 1 substitution)
const template2 = {raw: ["a", "b"]};
const result2 = String.raw(template2, 42);
$(result2); // Expected: "a42b"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`foo`, `bar`];
const tmpMCP /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(tmpMCP, 42);
$(result);
const tmpObjLitVal$1 /*:array*/ /*truthy*/ = [`a`, `b`];
const template2 /*:object*/ /*truthy*/ = { raw: tmpObjLitVal$1 };
const result2 /*:string*/ = $String_raw(template2, 42);
$(result2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`foo`, `bar`];
$($String_raw({ raw: tmpObjLitVal }, 42));
const tmpObjLitVal$1 = [`a`, `b`];
$($String_raw({ raw: tmpObjLitVal$1 }, 42));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "foo", "bar" ];
const b = { raw: a };
const c = $String_raw( b, 42 );
$( c );
const d = [ "a", "b" ];
const e = { raw: d };
const f = $String_raw( e, 42 );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_raw;
const tmpObjLitVal = [`foo`, `bar`];
const tmpMCP = { raw: tmpObjLitVal };
const result = $dotCall(tmpMCF, $string_constructor, `raw`, tmpMCP, 42);
$(result);
const tmpObjLitVal$1 = [`a`, `b`];
const template2 = { raw: tmpObjLitVal$1 };
const tmpMCF$1 = $String_raw;
const result2 = $String_raw(template2, 42);
$(result2);
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo42bar'
 - 2: 'a42b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
