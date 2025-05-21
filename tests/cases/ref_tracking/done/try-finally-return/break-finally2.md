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
  let $implicitThrow___14__ = false;
  let $finalStep___17__ = false;
  let $finalCatchArg___20__ = undefined___21__;
  $finally___23__: /*24*/ {
    try /*26*/ {
      $();
      x___33__ = 2;
      $finalStep___37__ = true;
      break $finally___39__;
    } catch ($finalImplicit___41__) /*42*/ {
      $implicitThrow___46__ = true;
      $finalCatchArg___50__ = $finalImplicit___49__;
    }
  }
  $(x___54__);
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


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 54,78       | none           | 33,65
  - w @33      | ########## | 54,78       | 4              | 65
  - r @54      | 4,33
  - w @65      | ########## | 78          | 4,33           | none
  - r @78      | 4,33,65

$implicitThrow:
  - w @14          | ########## | 68          | none           | 46
  - w @46          | ########## | 68          | 14             | none
  - r @68          | 14,46

$finalStep:
  - w @17          | ########## | not read    | none           | 37
  - w @37          | ########## | not read    | 17             | none

$finalCatchArg:
  - w @20          | ########## | 71          | none           | 50
  - w @50          | ########## | 71          | 20             | none
  - r @71          | 20,50

$finalImplicit:
  - w @41          | ########## | 49          | none           | none
  - r @49          | 41

tmpIfTest:
  - w @56          | ########## | 60          | none           | none
  - r @60          | 56
