# Preval test case

# arguments_variable_arg_count.md

> Arguments > Ai > Arguments variable arg count
>
> Test functions called with variable argument counts

## Input

`````js filename=intro
function testVariableArgCount() {
  const len = arguments.length;
  const first = arguments[0];
  const last = arguments[len - 1];
  $(len, first, last);
}

testVariableArgCount();
testVariableArgCount(1);
testVariableArgCount(1, 2);
testVariableArgCount(1, 2, 3, 4, 5);
`````


## Settled


`````js filename=intro
const testVariableArgCount /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const tmpCalleeParam /*:number*/ = tmpPrevalAliasArgumentsLen - 1;
  const last /*:unknown*/ = tmpPrevalAliasArgumentsAny[tmpCalleeParam];
  $(tmpPrevalAliasArgumentsLen, first, last);
  return undefined;
};
testVariableArgCount();
testVariableArgCount(1);
testVariableArgCount(1, 2);
testVariableArgCount(1, 2, 3, 4, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testVariableArgCount = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const first = tmpPrevalAliasArgumentsAny[0];
  const tmpCalleeParam = tmpPrevalAliasArgumentsLen - 1;
  $(tmpPrevalAliasArgumentsLen, first, tmpPrevalAliasArgumentsAny[tmpCalleeParam]);
};
testVariableArgCount();
testVariableArgCount(1);
testVariableArgCount(1, 2);
testVariableArgCount(1, 2, 3, 4, 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  const d = c.length;
  debugger;
  const e = b[ 0 ];
  const f = d - 1;
  const g = b[ f ];
  $( d, e, g );
  return undefined;
};
a();
a( 1 );
a( 1, 2 );
a( 1, 2, 3, 4, 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testVariableArgCount = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  const first = tmpPrevalAliasArgumentsAny[0];
  const tmpCompObj = tmpPrevalAliasArgumentsAny;
  const tmpCalleeParam = len - 1;
  const last = tmpCompObj[tmpCalleeParam];
  $(len, first, last);
  return undefined;
};
testVariableArgCount();
testVariableArgCount(1);
testVariableArgCount(1, 2);
testVariableArgCount(1, 2, 3, 4, 5);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, undefined, undefined
 - 2: 1, 1, 1
 - 3: 2, 1, 2
 - 4: 5, 1, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
