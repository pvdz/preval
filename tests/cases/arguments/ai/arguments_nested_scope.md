# Preval test case

# arguments_nested_scope.md

> Arguments > Ai > Arguments nested scope
>
> Test arguments access in deeply nested scopes

## Input

`````js filename=intro
function testArgsNestedScope() {
  const outer = () => {
    const middle = () => {
      const inner = () => {
        const len = arguments.length;
        const first = arguments[0];
        $(len, first);
      };
      inner();
    };
    middle();
  };
  outer();
}
testArgsNestedScope('deeply_nested');
`````


## Settled


`````js filename=intro
const testArgsNestedScope /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  $(1, first);
  return undefined;
};
testArgsNestedScope(`deeply_nested`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsNestedScope = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(1, tmpPrevalAliasArgumentsAny[0]);
};
testArgsNestedScope(`deeply_nested`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  $( 1, d );
  return undefined;
};
a( "deeply_nested" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsNestedScope = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const outer = function () {
    debugger;
    const middle = function () {
      debugger;
      const inner = function () {
        debugger;
        const len = tmpPrevalAliasArgumentsLen;
        const first = tmpPrevalAliasArgumentsAny[0];
        $(len, first);
        return undefined;
      };
      inner();
      return undefined;
    };
    middle();
    return undefined;
  };
  outer();
  return undefined;
};
testArgsNestedScope(`deeply_nested`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'deeply_nested'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
