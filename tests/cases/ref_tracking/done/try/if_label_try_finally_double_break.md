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
let x___4__ = $(1);
if (x___9__) {
  /*10*/ here___12__: /*13*/ {
    $(x___17__);
    x___23__ = $(2);
    $(x___27__);
    x___33__ = $(3);
    let $implicitThrow___36__ = false;
    let $finalStep___40__ = false;
    let $finalCatchArg___44__ = undefined___45__;
    $finally___47__: /*48*/ {
      try /*50*/ {
        $(x___54__);
        if (x___56__) {
          /*57*/ x___63__ = $(4);
          $finalStep___67__ = true;
          break $finally___69__;
        } /*70*/ else {
          x___76__ = $(5);
        }
      } catch ($finalImplicit___78__) /*79*/ {
        $implicitThrow___83__ = true;
        $finalCatchArg___87__ = $finalImplicit___86__;
      }
    }
    const tmpIfTest___90__ = $();
    if (tmpIfTest___94__) {
      /*95*/ $(x___99__);
      x___105__ = $(61);
      break here___107__;
    } /*108*/ else {
      $(x___112__);
      x___118__ = $(62);
      break here___120__;
    }
  }
  $(x___124__);
  x___130__ = $(8);
  $(x___134__);
} /*135*/ else {
  $(x___139__);
}
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,17,139    | none           | 23
  - r @9       | 4
  - r @17      | 4
  - w @23      | ########## | 27          | 4              | 33
  - r @27      | 23
  - w @33      | ########## | 54,56,99,112 | 23             | 63,76,105,118
  - r @54      | 33
  - r @56      | 33
  - w @63      | ########## | 99,112      | 33             | 105,118
  - w @76      | ########## | 99,112      | 33             | 105,118
  - r @99      | 33,63,76
  - w @105     | ########## | 124         | 33,63,76       | 130
  - r @112     | 33,63,76
  - w @118     | ########## | 124         | 33,63,76       | 130
  - r @124     | 105,118
  - w @130     | ########## | 134         | 105,118        | none
  - r @134     | 130
  - r @139     | 4

$implicitThrow:
  - w @36          | ########## | not read    | none           | 83
  - w @83          | ########## | not read    | 36             | none

$finalStep:
  - w @40          | ########## | not read    | none           | 67
  - w @67          | ########## | not read    | 40             | none

$finalCatchArg:
  - w @44          | ########## | not read    | none           | 87
  - w @87          | ########## | not read    | 44             | none

tmpIfTest:
  - w @90          | ########## | 94          | none           | none
  - r @94          | 90
