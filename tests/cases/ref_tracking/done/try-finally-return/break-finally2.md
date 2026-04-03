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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ here: /*8~74*/ {
  /* stmt(13): */ let /*___14__*/ $implicitThrow = false;
  /* stmt(16): */ let /*___17__*/ $finalStep = false;
  /* stmt(19): */ let /*___20__*/ $finalCatchArg = /*___21__*/ undefined;
  /* stmt(22): */ /*___23__*/ $finally: /*24~50*/ {
    /* stmt(25): */ try /*26~39*/ {
      /* stmt(27): */ $();
      /* stmt(30): */ /*___33__*/ x = 2;
      /* stmt(34): */ /*___37__*/ $finalStep = true;
      /* stmt(38): */ break /*___39__*/ $finally;
    } catch (/*___41__*/ $finalImplicit) /*42~50*/ {
      /* stmt(43): */ /*___46__*/ $implicitThrow = true;
      /* stmt(47): */ /*___50__*/ $finalCatchArg = /*___49__*/ $finalImplicit;
    }
  }
  /* stmt(51): */ $(/*___54__*/ x);
  /* stmt(55): */ const /*___56__*/ tmpIfTest = $();
  /* stmt(59): */ if (/*___60__*/ tmpIfTest) {
    /*61~65*/ /* stmt(62): */ /*___65__*/ x = 3;
  } /*66~66*/ else {
  }
  /* stmt(67): */ if (/*___68__*/ $implicitThrow) {
    /*69~71*/ /* stmt(70): */ throw /*___71__*/ $finalCatchArg;
  } /*72~74*/ else {
    /* stmt(73): */ break /*___74__*/ here;
  }
}
/* stmt(75): */ $(/*___78__*/ x);
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
