# Preval test case

# loop_continue_callback.md

> Let aliases > Ai > Loop continue callback
>
> Mutation in a loop with continue and callback (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 3; i++) {
  if (i === 0) continue;
  [1].forEach(() => { x = "changed"; });
  break;
}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
let i /*:number*/ = 0;
while (true) {
  const tmpIfTest /*:boolean*/ = i < 3;
  if (tmpIfTest) {
    const tmpIfTest$1 /*:boolean*/ = i === 0;
    if (tmpIfTest$1) {
      i = i + 1;
    } else {
      x = `changed`;
      let tmpClusterSSA_tmpLambdaForeachCounter /*:number*/ = 1;
      const tmpMCOO /*:array*/ /*truthy*/ = [1];
      while ($LOOP_UNROLL_10) {
        const tmpLambdaForeachCounterTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaForeachCounter < 1;
        if (tmpLambdaForeachCounterTest$1) {
          0 in tmpMCOO;
          tmpClusterSSA_tmpLambdaForeachCounter = tmpClusterSSA_tmpLambdaForeachCounter + 1;
        } else {
          break;
        }
      }
      break;
    }
  } else {
    break;
  }
}
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
let i = 0;
while (true) {
  if (i < 3) {
    if (i === 0) {
      i = i + 1;
    } else {
      x = `changed`;
      let tmpClusterSSA_tmpLambdaForeachCounter = 1;
      const tmpMCOO = [1];
      while (true) {
        if (tmpClusterSSA_tmpLambdaForeachCounter < 1) {
          0 in tmpMCOO;
          tmpClusterSSA_tmpLambdaForeachCounter = tmpClusterSSA_tmpLambdaForeachCounter + 1;
        } else {
          break;
        }
      }
      break;
    }
  } else {
    break;
  }
}
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
let c = 0;
while (true) {
  const d = c < 3;
  if (d) {
    const e = c === 0;
    if (e) {
      c = c + 1;
    }
    else {
      a = "changed";
      let f = 1;
      const g = [ 1 ];
      while ($LOOP_UNROLL_10) {
        const h = f < 1;
        if (h) {
          0 in g;
          f = f + 1;
        }
        else {
          break;
        }
      }
      break;
    }
  }
  else {
    break;
  }
}
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
let i = 0;
while (true) {
  const tmpIfTest = i < 3;
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = i === 0;
      if (tmpIfTest$1) {
        break $continue;
      } else {
        const tmpMCOO = [1];
        const tmpMCF = tmpMCOO.forEach;
        const tmpMCP = function () {
          debugger;
          x = `changed`;
          return undefined;
        };
        $dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP);
        break;
      }
    }
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: LabeledStatement
- (todo) do we want to support BinaryExpression as expression statement in free loops?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


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
