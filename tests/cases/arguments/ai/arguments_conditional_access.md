# Preval test case

# arguments_conditional_access.md

> Arguments > Ai > Arguments conditional access
>
> Test conditional access to arguments

## Input

`````js filename=intro
function testArgsConditional() {
  let result = [];
  if (arguments.length > 0) {
    result.push(arguments[0]);
  }
  if (arguments.length > 1) {
    result.push(arguments[1]);
  }
  $(result);
}
testArgsConditional('first');
`````


## Settled


`````js filename=intro
const testArgsConditional /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpMCP /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const result /*:array*/ /*truthy*/ = [tmpMCP];
  $(result);
  return undefined;
};
testArgsConditional(`first`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsConditional = function () {
  const tmpMCP = arguments[0];
  $([tmpMCP]);
};
testArgsConditional(`first`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = [ d ];
  $( e );
  return undefined;
};
a( "first" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsConditional = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  let result = [];
  const tmpIfTest = tmpPrevalAliasArgumentsLen > 0;
  if (tmpIfTest) {
    const tmpMCF = result.push;
    const tmpMCP = tmpPrevalAliasArgumentsAny[0];
    $dotCall(tmpMCF, result, `push`, tmpMCP);
  } else {
  }
  const tmpIfTest$1 = tmpPrevalAliasArgumentsLen > 1;
  if (tmpIfTest$1) {
    const tmpMCF$1 = result.push;
    const tmpMCP$1 = tmpPrevalAliasArgumentsAny[1];
    $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
    $(result);
    return undefined;
  } else {
    $(result);
    return undefined;
  }
};
testArgsConditional(`first`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init MemberExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['first']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
