# Preval test case

# hits_bug.md

> Array methods > Foreach > Hits bug
>
> This hits a strange corner case

This particular setup hit a corner case in fakeSync

## Input

`````js filename=intro
const outer = async function() {
  const closure = $();
  const inner = async function() {
    $(closure);
  };
  $dotCall($array_forEach, x, undefined, inner);
};
$dotCall($array_forEach, y, `forEach`, outer);
`````


## Settled


`````js filename=intro
const tmpLambdaForeachLen$1 /*:unknown*/ = y.length;
let tmpLambdaForeachCounter$1 /*:number*/ = 0;
while (true) {
  const tmpLambdaForeachCounterTest$1 /*:boolean*/ = tmpLambdaForeachCounter$1 < tmpLambdaForeachLen$1;
  if (tmpLambdaForeachCounterTest$1) {
    const tmpLambdaForeachCounterHas$1 /*:boolean*/ = tmpLambdaForeachCounter$1 in y;
    if (tmpLambdaForeachCounterHas$1) {
      y[tmpLambdaForeachCounter$1];
      y;
      try {
        const closure /*:unknown*/ = $();
        const tmpLambdaForeachLen /*:unknown*/ = x.length;
        const tmpLambdaForeachCounterTest /*:boolean*/ = 0 < tmpLambdaForeachLen;
        if (tmpLambdaForeachCounterTest) {
          const tmpLambdaForeachCounterHas /*:boolean*/ = 0 in x;
          if (tmpLambdaForeachCounterHas) {
            x[0];
            x;
            try {
              $(closure);
            } catch (tmpRejectErr$1) {}
          } else {
          }
          let tmpClusterSSA_tmpLambdaForeachCounter /*:number*/ = 1;
          while ($LOOP_UNROLLS_LEFT_10) {
            const tmpLambdaForeachCounterTest$2 /*:boolean*/ = tmpClusterSSA_tmpLambdaForeachCounter < tmpLambdaForeachLen;
            if (tmpLambdaForeachCounterTest$2) {
              const tmpLambdaForeachCounterHas$2 /*:boolean*/ = tmpClusterSSA_tmpLambdaForeachCounter in x;
              if (tmpLambdaForeachCounterHas$2) {
                x[tmpClusterSSA_tmpLambdaForeachCounter];
                x;
                try {
                  $(closure);
                } catch (tmpRejectErr$2) {}
              } else {
              }
              tmpClusterSSA_tmpLambdaForeachCounter = tmpClusterSSA_tmpLambdaForeachCounter + 1;
            } else {
              break;
            }
          }
        } else {
        }
      } catch (tmpRejectErr) {}
    } else {
    }
    tmpLambdaForeachCounter$1 = tmpLambdaForeachCounter$1 + 1;
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpLambdaForeachLen$1 = y.length;
let tmpLambdaForeachCounter$1 = 0;
while (true) {
  if (tmpLambdaForeachCounter$1 < tmpLambdaForeachLen$1) {
    if (tmpLambdaForeachCounter$1 in y) {
      y[tmpLambdaForeachCounter$1];
      y;
      try {
        const closure = $();
        const tmpLambdaForeachLen = x.length;
        if (0 < tmpLambdaForeachLen) {
          if (0 in x) {
            x[0];
            x;
            try {
              $(closure);
            } catch (tmpRejectErr$1) {}
          }
          let tmpClusterSSA_tmpLambdaForeachCounter = 1;
          while (true) {
            if (tmpClusterSSA_tmpLambdaForeachCounter < tmpLambdaForeachLen) {
              if (tmpClusterSSA_tmpLambdaForeachCounter in x) {
                x[tmpClusterSSA_tmpLambdaForeachCounter];
                x;
                try {
                  $(closure);
                } catch (tmpRejectErr$2) {}
              }
              tmpClusterSSA_tmpLambdaForeachCounter = tmpClusterSSA_tmpLambdaForeachCounter + 1;
            } else {
              break;
            }
          }
        }
      } catch (tmpRejectErr) {}
    }
    tmpLambdaForeachCounter$1 = tmpLambdaForeachCounter$1 + 1;
  } else {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = y.length;
let b = 0;
while (true) {
  const c = b < a;
  if (c) {
    const d = b in y;
    if (d) {
      y[ b ];
      y;
      try {
        const e = $();
        const f = x.length;
        const g = 0 < f;
        if (g) {
          const h = 0 in x;
          if (h) {
            x[ 0 ];
            x;
            try {
              $( e );
            }
            catch (i) {

            }
          }
          let j = 1;
          while ($LOOP_UNROLLS_LEFT_10) {
            const k = j < f;
            if (k) {
              const l = j in x;
              if (l) {
                x[ j ];
                x;
                try {
                  $( e );
                }
                catch (m) {

                }
              }
              j = j + 1;
            }
            else {
              break;
            }
          }
        }
      }
      catch (n) {

      }
    }
    b = b + 1;
  }
  else {
    break;
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const outer = async function () {
  debugger;
  const closure = $();
  const inner = async function () {
    debugger;
    $(closure);
    return undefined;
  };
  $dotCall($array_forEach, x, undefined, inner);
  return undefined;
};
$dotCall($array_forEach, y, `forEach`, outer);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) inline async functions safely (because await)
- (todo) regular property access of an ident feels tricky;
- (todo) type trackeed tricks can possibly support static $Promise_reject
- (todo) type trackeed tricks can possibly support static $Promise_resolve
- (todo) type trackeed tricks can possibly support static $array_forEach
- (todo) what last statement is not return? TryStatement


## Globals


BAD@! Found 2 implicit global bindings:

y, x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
