# Preval test case

# if_label_try_finally_double_break.md

> Ref tracking > Done > Try > If label try finally double break
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  if (x) {               // x=1
    $(x);                // x=1
    x = $(2);
    here: {
      $(x);              // x=2
      x = $(3);
      try {
        $(x);            // x=3
        if (x) {         // x=3
          x = $(4);
          break here;
        }
        x = $(5);        // (preval must consider this reachable)
      } finally {
        if ($()) {
          $(x);          // x=3 4 5
          x = $(61);
          break here;    // scheduled after label with x=61
        } else {
          $(x);          // x=3 4 5
          x = $(62);
          break here;    // scheduled after label with x=62
        }
        $(x);            // unreachable (else: x=3 4 5)
        x = $(63);       // unreachable
      }
      $(x);              // unreachable (else: x=63)
      x = $(7);          // unreachable
    }
    $(x);                // x=61 62 (7)
    x = $(8);
  }
  $(x);                  // x=1 8
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = $(1);
if (/*___9__*/ x) {
  /*10~134*/ /*___12__*/ here: /*13~120*/ {
    $(/*___21__*/ x);
    /*___27__*/ x = $(2);
    $(/*___31__*/ x);
    /*___37__*/ x = $(3);
    let /*___39__*/ $implicitThrow = false;
    let /*___42__*/ $finalStep = false;
    let /*___45__*/ $finalCatchArg = /*___46__*/ undefined;
    /*___48__*/ $finally: /*49~88*/ {
      try /*51~77*/ {
        $(/*___55__*/ x);
        if (/*___57__*/ x) {
          /*58~70*/ /*___64__*/ x = $(4);
          /*___68__*/ $finalStep = true;
          break /*___70__*/ $finally;
        } /*71~77*/ else {
          /*___77__*/ x = $(5);
        }
      } catch (/*___79__*/ $finalImplicit) /*80~88*/ {
        /*___84__*/ $implicitThrow = true;
        /*___88__*/ $finalCatchArg = /*___87__*/ $finalImplicit;
      }
    }
    const /*___90__*/ tmpIfTest = $();
    if (/*___94__*/ tmpIfTest) {
      /*95~107*/ $(/*___99__*/ x);
      /*___105__*/ x = $(61);
      break /*___107__*/ here;
    } /*108~120*/ else {
      $(/*___112__*/ x);
      /*___118__*/ x = $(62);
      break /*___120__*/ here;
    }
  }
  $(/*___124__*/ x);
  /*___130__*/ x = $(8);
  $(/*___134__*/ x);
} /*135~139*/ else {
  $(/*___139__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,21,139    | none           | 27
  - r @9       | 4
  - r @21      | 4
  - w @27      | ########## | 31          | 4              | 37
  - r @31      | 27
  - w @37      | ########## | 55,57,99,112 | 27             | 64,77,105,118
  - r @55      | 37
  - r @57      | 37
  - w @64      | ########## | 99,112      | 37             | 105,118
  - w @77      | ########## | 99,112      | 37             | 105,118
  - r @99      | 37,64,77
  - w @105     | ########## | 124         | 37,64,77       | 130
  - r @112     | 37,64,77
  - w @118     | ########## | 124         | 37,64,77       | 130
  - r @124     | 105,118
  - w @130     | ########## | 134         | 105,118        | none
  - r @134     | 130
  - r @139     | 4

$implicitThrow:
  - w @39          | ########## | not read    | none           | 84
  - w @84          | ########## | not read    | 39             | none

$finalStep:
  - w @42          | ########## | not read    | none           | 68
  - w @68          | ########## | not read    | 42             | none

$finalCatchArg:
  - w @45          | ########## | not read    | none           | 88
  - w @88          | ########## | not read    | 45             | none

$finalImplicit:
  - w @79          | ########## | 87          | none           | none
  - r @87          | 79

tmpIfTest:
  - w @90          | ########## | 94          | none           | none
  - r @94          | 90
