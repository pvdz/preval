# Preval test case

# nested_callback_chain_mutation.md

> Let aliases > Ai > Nested callback chain mutation
>
> Mutation in nested callback chain (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
[1].map(() => {
  [2].forEach(() => {
    x = "changed";
  });
});
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
let tmpLambdaMapCounter /*:number*/ = 0;
const tmpMCOO /*:array*/ /*truthy*/ = [1];
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [];
while (true) {
  const tmpLambdaMapTest /*:boolean*/ = tmpLambdaMapCounter < 1;
  if (tmpLambdaMapTest) {
    const tmpLambdaMapHas /*:boolean*/ = tmpLambdaMapCounter in tmpMCOO;
    if (tmpLambdaMapHas) {
      x = `changed`;
      let tmpClusterSSA_tmpLambdaForeachCounter /*:number*/ = 1;
      const tmpMCOO$1 /*:array*/ /*truthy*/ = [2];
      while ($LOOP_UNROLL_10) {
        const tmpLambdaForeachCounterTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaForeachCounter < 1;
        if (tmpLambdaForeachCounterTest$1) {
          0 in tmpMCOO$1;
          tmpClusterSSA_tmpLambdaForeachCounter = tmpClusterSSA_tmpLambdaForeachCounter + 1;
        } else {
          break;
        }
      }
      tmpLambdaMapOut[tmpLambdaMapCounter] = undefined;
    } else {
    }
    tmpLambdaMapCounter = tmpLambdaMapCounter + 1;
  } else {
    break;
  }
}
tmpLambdaMapOut.length = 1;
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
let tmpLambdaMapCounter = 0;
const tmpMCOO = [1];
const tmpLambdaMapOut = [];
while (true) {
  if (tmpLambdaMapCounter < 1) {
    if (tmpLambdaMapCounter in tmpMCOO) {
      x = `changed`;
      let tmpClusterSSA_tmpLambdaForeachCounter = 1;
      const tmpMCOO$1 = [2];
      while (true) {
        if (tmpClusterSSA_tmpLambdaForeachCounter < 1) {
          0 in tmpMCOO$1;
          tmpClusterSSA_tmpLambdaForeachCounter = tmpClusterSSA_tmpLambdaForeachCounter + 1;
        } else {
          break;
        }
      }
      tmpLambdaMapOut[tmpLambdaMapCounter] = undefined;
    }
    tmpLambdaMapCounter = tmpLambdaMapCounter + 1;
  } else {
    break;
  }
}
tmpLambdaMapOut.length = 1;
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
let c = 0;
const d = [ 1 ];
const e = [];
while (true) {
  const f = c < 1;
  if (f) {
    const g = c in d;
    if (g) {
      a = "changed";
      let h = 1;
      const i = [ 2 ];
      while ($LOOP_UNROLL_10) {
        const j = h < 1;
        if (j) {
          0 in i;
          h = h + 1;
        }
        else {
          break;
        }
      }
      e[c] = undefined;
    }
    c = c + 1;
  }
  else {
    break;
  }
}
e.length = 1;
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpMCOO = [1];
const tmpMCF = tmpMCOO.map;
const tmpMCP = function () {
  debugger;
  const tmpMCOO$1 = [2];
  const tmpMCF$1 = tmpMCOO$1.forEach;
  const tmpMCP$1 = function () {
    debugger;
    x = `changed`;
    return undefined;
  };
  $dotCall(tmpMCF$1, tmpMCOO$1, `forEach`, tmpMCP$1);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `map`, tmpMCP);
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Support non-primitive in first arg to $coerce
- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) array reads var statement with init BinaryExpression
- (todo) do we want to support BinaryExpression as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_forEach
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
