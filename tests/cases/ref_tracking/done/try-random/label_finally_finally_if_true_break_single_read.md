# Preval test case

# label_finally_finally_if_true_break_single_read.md

> Ref tracking > Done > Try-random > Label finally finally if true break single read
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    x = 2;
  } finally {
    x = 3;
    try {
      x = 4;
      if ($(true)) {
        x = 5;
        break back;
      }
      x = 6;
    } finally {
      x = 7;
    }
    x = 8;
  }
  x = 9;
}
$(x); // x=7 9 (the break still jumps over 9 once)
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  let $implicitThrow$1___11__ = false;
  let $finalCatchArg$1___15__ = undefined___16__;
  try /*18*/ {
    x___22__ = 2;
  } catch ($finalImplicit$1___24__) /*25*/ {
    $implicitThrow$1___29__ = true;
    $finalCatchArg$1___33__ = $finalImplicit$1___32__;
  }
  x___37__ = 3;
  let $implicitThrow___40__ = false;
  let $finalStep___44__ = false;
  let $finalCatchArg___48__ = undefined___49__;
  $finally___51__: /*52*/ {
    try /*54*/ {
      x___58__ = 4;
      const tmpIfTest___61__ = $(true);
      if (tmpIfTest___66__) {
        /*67*/ x___71__ = 5;
        $finalStep___75__ = true;
        break $finally___77__;
      } /*78*/ else {
        x___82__ = 6;
      }
    } catch ($finalImplicit___84__) /*85*/ {
      $implicitThrow___89__ = true;
      $finalCatchArg___93__ = $finalImplicit___92__;
    }
  }
  x___97__ = 7;
  if ($implicitThrow___99__) {
    /*100*/ throw $finalCatchArg___102__;
  } /*103*/ else {
    if ($finalStep___105__) {
      /*106*/ break back___108__;
    } /*109*/ else {
      x___113__ = 8;
      if ($implicitThrow$1___115__) {
        /*116*/ throw $finalCatchArg$1___118__;
      } /*119*/ else {
        x___123__ = 9;
      }
    }
  }
}
$(x___127__);
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 127         | none           | 22,37
  - w @22      | ########## | not read    | 4              | 37
  - w @37      | ########## | not read    | 4,22           | 58,97
  - w @58      | ########## | not read    | 37             | 71,82,97
  - w @71      | ########## | not read    | 58             | 97
  - w @82      | ########## | not read    | 58             | 97
  - w @97      | ########## | 127         | 37,58,71,82    | 113
  - w @113     | ########## | not read    | 97             | 123
  - w @123     | ########## | 127         | 113            | none
  - r @127     | 4,97,123

$implicitThrow$1:
  - w @11            | ########## | 115         | none           | 29
  - w @29            | ########## | 115         | 11             | none
  - r @115           | 11,29

$finalCatchArg$1:
  - w @15            | ########## | 118         | none           | 33
  - w @33            | ########## | 118         | 15             | none
  - r @118           | 15,33

$implicitThrow:
  - w @40            | ########## | 99          | none           | 89
  - w @89            | ########## | 99          | 40             | none
  - r @99            | 40,89

$finalStep:
  - w @44            | ########## | 105         | none           | 75
  - w @75            | ########## | 105         | 44             | none
  - r @105           | 44,75

$finalCatchArg:
  - w @48            | ########## | 102         | none           | 93
  - w @93            | ########## | 102         | 48             | none
  - r @102           | 48,93

tmpIfTest:
  - w @61            | ########## | 66          | none           | none
  - r @66            | 61
