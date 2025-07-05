# Preval test case

# arguments_method_call.md

> Arguments > Ai > Arguments method call
>
> Test arguments object method calls

## Input

`````js filename=intro
function testArgsMethods() {
  const slice = arguments.slice(1, 3);
  const join = Array.prototype.join.call(arguments, ',');
  $(slice, join);
}
testArgsMethods('a', 'b', 'c', 'd');
`````


## Settled


`````js filename=intro
const testArgsMethods /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpMCF /*:unknown*/ = tmpPrevalAliasArgumentsAny.slice;
  const slice /*:unknown*/ = $dotCall(tmpMCF, tmpPrevalAliasArgumentsAny, `slice`, 1, 3);
  const join /*:string*/ = $dotCall($array_join, tmpPrevalAliasArgumentsAny, undefined, `,`);
  $(slice, join);
  return undefined;
};
testArgsMethods(`a`, `b`, `c`, `d`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsMethods = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(tmpPrevalAliasArgumentsAny.slice(1, 3), $dotCall($array_join, tmpPrevalAliasArgumentsAny, undefined, `,`));
};
testArgsMethods(`a`, `b`, `c`, `d`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b.slice;
  const e = $dotCall( d, b, "slice", 1, 3 );
  const f = $dotCall( $array_join, b, undefined, "," );
  $( e, f );
  return undefined;
};
a( "a", "b", "c", "d" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsMethods = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpMCF = tmpPrevalAliasArgumentsAny.slice;
  const slice = $dotCall(tmpMCF, tmpPrevalAliasArgumentsAny, `slice`, 1, 3);
  const tmpCompObj = $Array_prototype;
  const tmpMCOO = tmpCompObj.join;
  const tmpMCF$1 = tmpMCOO.call;
  const join = $dotCall(tmpMCF$1, tmpMCOO, `call`, tmpPrevalAliasArgumentsAny, `,`);
  $(slice, join);
  return undefined;
};
testArgsMethods(`a`, `b`, `c`, `d`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
