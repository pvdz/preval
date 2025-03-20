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
      x___89__ = 7;
      throw $finalImplicit___91__;
    }
  }
  x___95__ = 7;
  if ($implicitThrow___97__) {
    /*98*/ throw $finalCatchArg___100__;
  } /*101*/ else {
    if ($finalStep___103__) {
      /*104*/ break back___106__;
    } /*107*/ else {
      x___111__ = 8;
      if ($implicitThrow$1___113__) {
        /*114*/ throw $finalCatchArg$1___116__;
      } /*117*/ else {
        x___121__ = 9;
      }
    }
  }
}
$(x___125__);
`````


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 22,37
  - w @22      | ########## | not read    | 4              | 37
  - w @37      | ########## | not read    | 4,22           | 58,89
  - w @58      | ########## | not read    | 37             | 71,82,89
  - w @71      | ########## | not read    | 58             | 89,95
  - w @82      | ########## | not read    | 58             | 89,95
  - w @89      | ########## | not read    | 37,58,71,82    | none
  - w @95      | ########## | 125         | 71,82          | 111
  - w @111     | ########## | not read    | 95             | 121
  - w @121     | ########## | 125         | 111            | none
  - r @125     | 95,121

$implicitThrow$1:
  - w @11            | ########## | 113         | none           | 29
  - w @29            | ########## | 113         | 11             | none
  - r @113           | 11,29

$finalCatchArg$1:
  - w @15            | ########## | 116         | none           | 33
  - w @33            | ########## | 116         | 15             | none
  - r @116           | 15,33

$implicitThrow:
  - w @40            | ########## | 97          | none           | none
  - r @97            | 40

$finalStep:
  - w @44            | ########## | 103         | none           | 75
  - w @75            | ########## | 103         | 44             | none
  - r @103           | 44,75

$finalCatchArg:
  - w @48            | ########## | 100         | none           | none
  - r @100           | 48

tmpIfTest:
  - w @61            | ########## | 66          | none           | none
  - r @66            | 61
