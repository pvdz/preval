# Preval test case

# break-finally2.md

> Ref tracking > Done > Try-finally-return > Break-finally2

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  
  here: {
    try {
      $(); // "may fail"
      x = 2;
      break here;
    } finally {
      $(x); // 1 or 2
      if ($()) {
        x = 3;
      }
    }

    // Dead code (not relevant to ref test)
    //$(x);
    //x = 4;
  }
  
  $(x); // 2 or 3 (and because we don't DCE yet, 1 as well)
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
here___7__: /*8*/ {
  let $implicitThrow___11__ = false;
  let $finalStep___15__ = false;
  let $finalCatchArg___19__ = undefined___20__;
  $finally___22__: /*23*/ {
    try /*25*/ {
      $();
      x___32__ = 2;
      $finalStep___36__ = true;
      break $finally___38__;
    } catch ($finalImplicit___40__) /*41*/ {
      $implicitThrow___45__ = true;
      $finalCatchArg___49__ = $finalImplicit___48__;
    }
  }
  $(x___53__);
  const tmpIfTest___56__ = $();
  if (tmpIfTest___60__) {
    /*61*/ x___65__ = 3;
  } /*66*/ else {
  }
  if ($implicitThrow___68__) {
    /*69*/ throw $finalCatchArg___71__;
  } /*72*/ else {
    break here___74__;
  }
}
$(x___78__);
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 53,78       | none           | 32,65
  - w @32      | ########## | 53,78       | 4              | 65
  - r @53      | 4,32
  - w @65      | ########## | 78          | 4,32           | none
  - r @78      | 4,32,65

$implicitThrow:
  - w @11          | ########## | 68          | none           | 45
  - w @45          | ########## | 68          | 11             | none
  - r @68          | 11,45

$finalStep:
  - w @15          | ########## | not read    | none           | 36
  - w @36          | ########## | not read    | 15             | none

$finalCatchArg:
  - w @19          | ########## | 71          | none           | 49
  - w @49          | ########## | 71          | 19             | none
  - r @71          | 19,49

tmpIfTest:
  - w @56          | ########## | 60          | none           | none
  - r @60          | 56
