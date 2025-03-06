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

## Pre Normal


`````js filename=intro
let i = 10;
while (true) {
  $continue: {
    {
      if (i-- > 0) break $continue;
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

## Normalized


`````js filename=intro
let i = 10;
while (true) {
  $continue: {
    const tmpPostUpdArgIdent = i;
    i = i - 1;
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

## Output


`````js filename=intro
let tmpClusterSSA_i$2 /*:number*/ = -1;
const test$2 /*:unknown*/ = $(`first`);
$(`second`);
if (test$2) {
} else {
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

## PST Output

With rename=true

`````js filename=intro
let a = -1;
const b = $( "first" );
$( "second" );
if (b) {

}
else {
  $( "third" );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const c = a;
    a = a - 1;
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

## Globals

None

## Result

Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Support this node type in isFree: LabeledStatement