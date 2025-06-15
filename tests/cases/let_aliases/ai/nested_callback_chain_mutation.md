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
let tmpArri$1 /*:number*/ = 0;
const tmpMCOO /*:array*/ /*truthy*/ = [1];
const tmpArreout /*:array*/ /*truthy*/ = [];
while (true) {
  const tmpArrc$1 /*:boolean*/ = tmpArri$1 < 1;
  if (tmpArrc$1) {
    const tmpArrin$1 /*:boolean*/ = tmpArri$1 in tmpMCOO;
    if (tmpArrin$1) {
      x = `changed`;
      let tmpClusterSSA_tmpArri /*:number*/ = 1;
      const tmpMCOO$1 /*:array*/ /*truthy*/ = [2];
      while ($LOOP_UNROLL_10) {
        const tmpArrc$2 /*:boolean*/ = tmpClusterSSA_tmpArri < 1;
        if (tmpArrc$2) {
          0 in tmpMCOO$1;
          tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
        } else {
          break;
        }
      }
      tmpArreout[tmpArri$1] = undefined;
    } else {
    }
    tmpArri$1 = tmpArri$1 + 1;
  } else {
    break;
  }
}
tmpArreout.length = 1;
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
let tmpArri$1 = 0;
const tmpMCOO = [1];
const tmpArreout = [];
while (true) {
  if (tmpArri$1 < 1) {
    if (tmpArri$1 in tmpMCOO) {
      x = `changed`;
      let tmpClusterSSA_tmpArri = 1;
      const tmpMCOO$1 = [2];
      while (true) {
        if (tmpClusterSSA_tmpArri < 1) {
          0 in tmpMCOO$1;
          tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
        } else {
          break;
        }
      }
      tmpArreout[tmpArri$1] = undefined;
    }
    tmpArri$1 = tmpArri$1 + 1;
  } else {
    break;
  }
}
tmpArreout.length = 1;
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


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support non-primitive in first arg to $coerce
- (todo) Support this binary expression operator:
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) do we want to support BinaryExpression as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
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
