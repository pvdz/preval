# Preval test case

# loop_continue_bound_returned_fn.md

> Let aliases > Ai > Loop continue bound returned fn
>
> Mutation in a loop with continue and bound returned function (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 3; i++) {
  if (i === 0) continue;
  function makeMutator() {
    return function() { x = "changed"; };
  }
  const mutator = makeMutator().bind(null);
  mutator();
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
      const tmpClusterSSA_tmpMCOO /*:()=>undefined*/ = function () {
        debugger;
        x = `changed`;
        return undefined;
      };
      const mutator /*:function*/ /*truthy*/ = $dotCall($function_bind, tmpClusterSSA_tmpMCOO, `bind`, null);
      mutator();
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
      const mutator = $dotCall(
        $function_bind,
        function () {
          x = `changed`;
        },
        `bind`,
        null,
      );
      mutator();
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
      const f = function() {
        debugger;
        a = "changed";
        return undefined;
      };
      const g = $dotCall( $function_bind, f, "bind", null );
      g();
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
      let makeMutator = function () {
        debugger;
        const tmpReturnArg = function () {
          debugger;
          x = `changed`;
          return undefined;
        };
        return tmpReturnArg;
      };
      const tmpIfTest$1 = i === 0;
      if (tmpIfTest$1) {
        break $continue;
      } else {
      }
      const tmpMCOO = makeMutator();
      const tmpMCF = tmpMCOO.bind;
      const mutator = $dotCall(tmpMCF, tmpMCOO, `bind`, null);
      mutator();
      break;
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


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this node type in isFree: LabeledStatement
- (todo) access object property that also exists on prototype? $function_bind
- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement
- (todo) this may support .call .apply and .bind but I think that different reducers should tackle it
- (todo) type trackeed tricks can possibly support static $function_bind


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
