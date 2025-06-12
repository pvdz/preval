# Preval test case

# string_raw_direct_1arg.md

> Builtins cases > Ai string > String raw direct 1arg
>
> Test String.raw called directly with 1 argument (template object, no substitutions)

## Input

`````js filename=intro
const template = {raw: ["foo"]};
const result = String.raw(template);
$(result); // Expected: "foo"
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`foo`];
const template /*:object*/ /*truthy*/ = { raw: tmpObjLitVal };
const result /*:string*/ = $String_raw(template);
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
const template = { raw: tmpObjLitVal };
const tmpMCF = $String_raw;
const result = $String_raw(template);
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
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
