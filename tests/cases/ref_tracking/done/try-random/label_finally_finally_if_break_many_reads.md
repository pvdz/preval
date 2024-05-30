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
  let $implicitThrow$1___11__ = false;
  let $finalCatchArg$1___15__ = undefined___16__;
  try /*18*/ {
    $(`try1`, x___24__);
    x___28__ = 2;
  } catch ($finalImplicit$1___30__) /*31*/ {
    $implicitThrow$1___35__ = true;
    $finalCatchArg$1___39__ = $finalImplicit$1___38__;
  }
  $(`final1`, x___45__);
  x___49__ = 3;
  let $implicitThrow___52__ = false;
  let $finalStep___56__ = false;
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
      $implicitThrow___113__ = true;
      $finalCatchArg___117__ = $finalImplicit___116__;
    }
  }
  $(`final2`, x___123__);
  x___127__ = 7;
  if ($implicitThrow___129__) {
    /*130*/ throw $finalCatchArg___132__;
  } /*133*/ else {
    if ($finalStep___135__) {
      /*136*/ break back___138__;
    } /*139*/ else {
      $(`post-final2`, x___145__);
      x___149__ = 8;
      if ($implicitThrow$1___151__) {
        /*152*/ throw $finalCatchArg$1___154__;
      } /*155*/ else {
        $(`post-final1`, x___161__);
        x___165__ = 9;
      }
    }
  }
}
$(`end`, x___171__);
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 24,45,171   | none           | 28,49
  - r @24      | 4
  - w @28      | ########## | 45          | 4              | 49
  - r @45      | 4,28
  - w @49      | ########## | 72,123      | 4,28           | 76,127
  - r @72      | 49
  - w @76      | ########## | 85,102,123  | 49             | 89,106,127
  - r @85      | 76
  - w @89      | ########## | 123         | 76             | 127
  - r @102     | 76
  - w @106     | ########## | 123         | 76             | 127
  - r @123     | 49,76,89,106
  - w @127     | ########## | 145,171     | 49,76,89,106   | 149
  - r @145     | 127
  - w @149     | ########## | 161         | 127            | 165
  - r @161     | 149
  - w @165     | ########## | 171         | 149            | none
  - r @171     | 4,127,165

$implicitThrow$1:
  - w @11            | ########## | 151         | none           | 35
  - w @35            | ########## | 151         | 11             | none
  - r @151           | 11,35

$finalCatchArg$1:
  - w @15            | ########## | 154         | none           | 39
  - w @39            | ########## | 154         | 15             | none
  - r @154           | 15,39

$implicitThrow:
  - w @52            | ########## | 129         | none           | 113
  - w @113           | ########## | 129         | 52             | none
  - r @129           | 52,113

$finalStep:
  - w @56            | ########## | 135         | none           | 93
  - w @93            | ########## | 135         | 56             | none
  - r @135           | 56,93

$finalCatchArg:
  - w @60            | ########## | 132         | none           | 117
  - w @117           | ########## | 132         | 60             | none
  - r @132           | 60,117
