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
let /*___4__*/ x = 1;
/*___7__*/ here: /*8~74*/ {
  let /*___14__*/ $implicitThrow = false;
  let /*___17__*/ $finalStep = false;
  let /*___20__*/ $finalCatchArg = /*___21__*/ undefined;
  /*___23__*/ $finally: /*24~50*/ {
    try /*26~39*/ {
      $();
      /*___33__*/ x = 2;
      /*___37__*/ $finalStep = true;
      break /*___39__*/ $finally;
    } catch (/*___41__*/ $finalImplicit) /*42~50*/ {
      /*___46__*/ $implicitThrow = true;
      /*___50__*/ $finalCatchArg = /*___49__*/ $finalImplicit;
    }
  }
  $(/*___54__*/ x);
  const /*___56__*/ tmpIfTest = $();
  if (/*___60__*/ tmpIfTest) {
    /*61~65*/ /*___65__*/ x = 3;
  } /*66~66*/ else {
  }
  if (/*___68__*/ $implicitThrow) {
    /*69~71*/ throw /*___71__*/ $finalCatchArg;
  } /*72~74*/ else {
    break /*___74__*/ here;
  }
}
$(/*___78__*/ x);
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
