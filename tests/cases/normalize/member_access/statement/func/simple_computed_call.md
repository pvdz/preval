# Preval test case

# simple_computed_call.md

> Normalize > Member access > Statement > Func > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
function f() {
  const obj = {foo: 10};
  obj[$('foo')];
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`foo`);
$coerce(tmpCalleeParam, `string`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(`foo`), `string`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
$coerce( a, "string" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const obj = { foo: 10 };
  const tmpCompObj = obj;
  const tmpCalleeParam = $(`foo`);
  tmpCompObj[tmpCalleeParam];
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
