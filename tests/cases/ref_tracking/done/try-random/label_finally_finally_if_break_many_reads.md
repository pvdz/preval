# Preval test case

# label_finally_finally_if_break_many_reads.md

> Ref tracking > Done > Try-random > Label finally finally if break many reads
> 
> A break that travels through two finally nodes before reaching its label.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    $('try1', x);          // x=1
    x = 2;
  } finally {
    $('final1', x);        // x=1 2
    x = 3;
    try {
      $('try2', x);        // x=3
      x = 4;
      if ($1) {
        $('if', x);        // x=4
        x = 5;
        break back;
      }
      $('post-if', x);     // x=4
      x = 6;
    } finally {
      $('final2', x);      // x=3 4 5 6
      x = 7;
    }
    $('post-final2', x);   // x=7
    x = 8;
  }
  $('post-final1', x);     // x=8
  x = 9;
}
$('end', x);               // x=7 9
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  let $implicitThrow$1___15__ = false;
  let $finalCatchArg$1___18__ = undefined___19__;
  try /*21*/ {
    $(`try1`, x___27__);
    x___31__ = 2;
  } catch ($finalImplicit$1___33__) /*34*/ {
    $implicitThrow$1___38__ = true;
    $finalCatchArg$1___42__ = $finalImplicit$1___41__;
  }
  $(`final1`, x___48__);
  x___52__ = 3;
  let $implicitThrow___54__ = false;
  let $finalStep___57__ = false;
  let $finalCatchArg___60__ = undefined___61__;
  $finally___63__: /*64*/ {
    try /*66*/ {
      $(`try2`, x___72__);
      x___76__ = 4;
      if ($1) {
        /*79*/ $(`if`, x___85__);
        x___89__ = 5;
        $finalStep___93__ = true;
        break $finally___95__;
      } /*96*/ else {
        $(`post-if`, x___102__);
        x___106__ = 6;
      }
    } catch ($finalImplicit___108__) /*109*/ {
      $(`final2`, x___115__);
      x___119__ = 7;
      throw $finalImplicit___121__;
    }
  }
  $(`final2`, x___127__);
  x___131__ = 7;
  if ($implicitThrow___133__) {
    /*134*/ throw $finalCatchArg___136__;
  } /*137*/ else {
    if ($finalStep___139__) {
      /*140*/ break back___142__;
    } /*143*/ else {
      $(`post-final2`, x___149__);
      x___153__ = 8;
      if ($implicitThrow$1___155__) {
        /*156*/ throw $finalCatchArg$1___158__;
      } /*159*/ else {
        $(`post-final1`, x___165__);
        x___169__ = 9;
      }
    }
  }
}
$(`end`, x___175__);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27,48       | none           | 31,52
  - r @27      | 4
  - w @31      | ########## | 48          | 4              | 52
  - r @48      | 4,31
  - w @52      | ########## | 72,115      | 4,31           | 76,119
  - r @72      | 52
  - w @76      | ########## | 85,102,115  | 52             | 89,106,119
  - r @85      | 76
  - w @89      | ########## | 115,127     | 76             | 119,131
  - r @102     | 76
  - w @106     | ########## | 115,127     | 76             | 119,131
  - r @115     | 52,76,89,106
  - w @119     | ########## | not read    | 52,76,89,106   | none
  - r @127     | 89,106
  - w @131     | ########## | 149,175     | 89,106         | 153
  - r @149     | 131
  - w @153     | ########## | 165         | 131            | 169
  - r @165     | 153
  - w @169     | ########## | 175         | 153            | none
  - r @175     | 131,169

$implicitThrow$1:
  - w @15            | ########## | 155         | none           | 38
  - w @38            | ########## | 155         | 15             | none
  - r @155           | 15,38

$finalCatchArg$1:
  - w @18            | ########## | 158         | none           | 42
  - w @42            | ########## | 158         | 18             | none
  - r @158           | 18,42

$implicitThrow:
  - w @54            | ########## | 133         | none           | none
  - r @133           | 54

$finalStep:
  - w @57            | ########## | 139         | none           | 93
  - w @93            | ########## | 139         | 57             | none
  - r @139           | 57,93

$finalCatchArg:
  - w @60            | ########## | 136         | none           | none
  - r @136           | 60
