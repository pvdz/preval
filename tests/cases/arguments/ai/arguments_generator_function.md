# Preval test case

# arguments_generator_function.md

> Arguments > Ai > Arguments generator function
>
> Test arguments in generator function

## Input

`````js filename=intro
function* testArgsGenerator() {
  const len = arguments.length;
  yield len;
  for (let i = 0; i < arguments.length; i++) {
    yield arguments[i];
  }
}
const gen = testArgsGenerator('a', 'b', 'c');
const results = [];
for (const value of gen) {
  results.push(value);
}
$(results);
`````


## Settled


`````js filename=intro
const testArgsGenerator /*:()=>object*/ = function* (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  yield 3;
  const tmpYieldArg /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  yield tmpYieldArg;
  const tmpYieldArg$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  yield tmpYieldArg$1;
  const tmpYieldArg$2 /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  yield tmpYieldArg$2;
  return undefined;
};
const gen /*:object*/ /*truthy*/ = testArgsGenerator(`a`, `b`, `c`);
const tmpForOfGenNext /*:unknown*/ = $forOf(gen);
const results /*:array*/ /*truthy*/ = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest$3 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$3) {
    break;
  } else {
    const value /*:unknown*/ = tmpForOfNext.value;
    $dotCall($array_push, results, `push`, value);
  }
}
$(results);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsGenerator = function* () {
  const tmpPrevalAliasArgumentsAny = arguments;
  yield 3;
  const tmpYieldArg = tmpPrevalAliasArgumentsAny[0];
  yield tmpYieldArg;
  const tmpYieldArg$1 = tmpPrevalAliasArgumentsAny[1];
  yield tmpYieldArg$1;
  const tmpYieldArg$2 = tmpPrevalAliasArgumentsAny[2];
  yield tmpYieldArg$2;
};
const tmpForOfGenNext = $forOf(testArgsGenerator(`a`, `b`, `c`));
const results = [];
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    $dotCall($array_push, results, `push`, tmpForOfNext.value);
  }
}
$(results);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function *() {
  const b = c;
  debugger;
  yield ( 3 );
  const d = b[ 0 ];
  yield ( d );
  const e = b[ 1 ];
  yield ( e );
  const f = b[ 2 ];
  yield ( f );
  return undefined;
};
const g = a( "a", "b", "c" );
const h = $forOf( g );
const i = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const j = h();
  const k = j.done;
  if (k) {
    break;
  }
  else {
    const l = j.value;
    $dotCall( $array_push, i, "push", l );
  }
}
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsGenerator = function* () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  yield len;
  let i = 0;
  while (true) {
    const tmpIfTest = i < tmpPrevalAliasArgumentsLen;
    if (tmpIfTest) {
      const tmpYieldArg = tmpPrevalAliasArgumentsAny[i];
      yield tmpYieldArg;
      const tmpPostUpdArgIdent = $coerce(i, `number`);
      i = tmpPostUpdArgIdent + 1;
    } else {
      break;
    }
  }
  return undefined;
};
const gen = testArgsGenerator(`a`, `b`, `c`);
const results = [];
const tmpForOfGenNext = $forOf(gen);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest$1 = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    const value = tmpForOfNext.value;
    const tmpMCF = results.push;
    $dotCall(tmpMCF, results, `push`, value);
  }
}
$(results);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) do we want to support YieldExpression as expression statement in free loops?
- (todo) inline generator functions safely (because yield)
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3, 'a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
