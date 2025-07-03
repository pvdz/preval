# Preval test case

# simple_computed_call.md

> Normalize > Member access > Statement > Global > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
obj[$('foo')];
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`foo`);
$coerce(tmpCalleeParam, `string`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
String($(`foo`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
$coerce( a, "string" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCalleeParam = $(`foo`);
tmpCompObj[tmpCalleeParam];
`````


## Todos triggered


None


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
