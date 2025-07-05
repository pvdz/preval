# Preval test case

# arguments_symbol_iterator.md

> Arguments > Ai > Arguments symbol iterator
>
> Test arguments with Symbol.iterator

## Input

`````js filename=intro
function testArgsIterator() {
  const iterator = arguments[Symbol.iterator]();
  const results = [];
  let next = iterator.next();
  while (!next.done) {
    results.push(next.value);
    next = iterator.next();
  }
  $(results);
}
testArgsIterator('a', 'b', 'c');
`````


## Settled


`````js filename=intro
const testArgsIterator /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpMCCP /*:unknown*/ = Symbol.iterator;
  const tmpMCF /*:unknown*/ = tmpPrevalAliasArgumentsAny[tmpMCCP];
  const iterator /*:unknown*/ = $dotCall(tmpMCF, tmpPrevalAliasArgumentsAny, undefined);
  const tmpMCF$1 /*:unknown*/ = iterator.next;
  const next /*:unknown*/ = $dotCall(tmpMCF$1, iterator, `next`);
  const tmpIfTest /*:unknown*/ = next.done;
  const results /*:array*/ /*truthy*/ = [];
  if (tmpIfTest) {
    $(results);
    return undefined;
  } else {
    const tmpMCP /*:unknown*/ = next.value;
    $dotCall($array_push, results, `push`, tmpMCP);
    const tmpMCF$5 /*:unknown*/ = iterator.next;
    let tmpClusterSSA_next /*:unknown*/ = $dotCall(tmpMCF$5, iterator, `next`);
    while ($LOOP_UNROLLS_LEFT_10) {
      const tmpIfTest$1 /*:unknown*/ = tmpClusterSSA_next.done;
      if (tmpIfTest$1) {
        break;
      } else {
        const tmpMCP$1 /*:unknown*/ = tmpClusterSSA_next.value;
        $dotCall($array_push, results, `push`, tmpMCP$1);
        const tmpMCF$2 /*:unknown*/ = iterator.next;
        tmpClusterSSA_next = $dotCall(tmpMCF$2, iterator, `next`);
      }
    }
    $(results);
    return undefined;
  }
};
testArgsIterator(`a`, `b`, `c`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsIterator = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpMCCP = Symbol.iterator;
  const iterator = tmpPrevalAliasArgumentsAny[tmpMCCP]();
  const next = iterator.next();
  const tmpIfTest = next.done;
  const results = [];
  if (tmpIfTest) {
    $(results);
  } else {
    $dotCall($array_push, results, `push`, next.value);
    let tmpClusterSSA_next = iterator.next();
    while (true) {
      if (tmpClusterSSA_next.done) {
        break;
      } else {
        $dotCall($array_push, results, `push`, tmpClusterSSA_next.value);
        tmpClusterSSA_next = iterator.next();
      }
    }
    $(results);
  }
};
testArgsIterator(`a`, `b`, `c`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = Symbol.iterator;
  const e = b[ d ];
  const f = $dotCall( e, b, undefined );
  const g = f.next;
  const h = $dotCall( g, f, "next" );
  const i = h.done;
  const j = [];
  if (i) {
    $( j );
    return undefined;
  }
  else {
    const k = h.value;
    $dotCall( $array_push, j, "push", k );
    const l = f.next;
    let m = $dotCall( l, f, "next" );
    while ($LOOP_UNROLLS_LEFT_10) {
      const n = m.done;
      if (n) {
        break;
      }
      else {
        const o = m.value;
        $dotCall( $array_push, j, "push", o );
        const p = f.next;
        m = $dotCall( p, f, "next" );
      }
    }
    $( j );
    return undefined;
  }
};
a( "a", "b", "c" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsIterator = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpMCCO = tmpPrevalAliasArgumentsAny;
  const tmpMCCP = Symbol.iterator;
  const tmpMCF = tmpMCCO[tmpMCCP];
  const iterator = $dotCall(tmpMCF, tmpMCCO, undefined);
  const results = [];
  const tmpMCF$1 = iterator.next;
  let next = $dotCall(tmpMCF$1, iterator, `next`);
  while (true) {
    const tmpIfTest = next.done;
    if (tmpIfTest) {
      break;
    } else {
      const tmpMCF$3 = results.push;
      const tmpMCP = next.value;
      $dotCall(tmpMCF$3, results, `push`, tmpMCP);
      const tmpMCF$5 = iterator.next;
      next = $dotCall(tmpMCF$5, iterator, `next`);
    }
  }
  $(results);
  return undefined;
};
testArgsIterator(`a`, `b`, `c`);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init MemberExpression
- (todo) inline arguments when function does not have that many params yet
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

Symbol


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
