# Preval test case

# continue.md

> Unroll loop with true > Continue
>
> Trying to unroll a while loop with `true` as condition.
> Note: it will unroll the loop one step of the 10 `continue` checks and 
> eliminate all of it, so the i will be initialized by 9 by the end. 
> Or it won't have a `continue` at all if/once we fix it proper.

## Input

`````js filename=intro
let i = 10;
while (true) {
    if (i-- > 0) continue;
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else {
      $('third');
    }
}
`````


## Settled


`````js filename=intro
const test$2 /*:unknown*/ = $(`first`);
$(`second`);
if (test$2) {
} else {
  let tmpClusterSSA_i$2 /*:number*/ = -1;
  $(`third`);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpPostUpdArgIdent$1 /*:unknown*/ = tmpClusterSSA_i$2;
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 - 1;
    const tmpIfTest$1 /*:boolean*/ = tmpPostUpdArgIdent$1 > 0;
    if (tmpIfTest$1) {
    } else {
      const test$1 /*:unknown*/ = $(`first`);
      $(`second`);
      if (test$1) {
        break;
      } else {
        $(`third`);
      }
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const test$2 = $(`first`);
$(`second`);
if (!test$2) {
  let tmpClusterSSA_i$2 = -1;
  $(`third`);
  while (true) {
    const tmpPostUpdArgIdent$1 = tmpClusterSSA_i$2;
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 - 1;
    if (!(tmpPostUpdArgIdent$1 > 0)) {
      const test$1 = $(`first`);
      $(`second`);
      if (test$1) {
        break;
      } else {
        $(`third`);
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "first" );
$( "second" );
if (a) {

}
else {
  let b = -1;
  $( "third" );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const c = b;
    b = b - 1;
    const d = c > 0;
    if (d) {

    }
    else {
      const e = $( "first" );
      $( "second" );
      if (e) {
        break;
      }
      else {
        $( "third" );
      }
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 10;
while (true) {
  $continue: {
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent - 1;
    const tmpBinLhs = tmpPostUpdArgIdent;
    const tmpIfTest = tmpBinLhs > 0;
    if (tmpIfTest) {
      break $continue;
    } else {
      const test = $(`first`);
      $(`second`);
      if (test) {
        break;
      } else {
        $(`third`);
      }
    }
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
