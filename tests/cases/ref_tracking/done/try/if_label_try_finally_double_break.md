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
    $(x___21__);
    x___27__ = $(2);
    $(x___31__);
    x___37__ = $(3);
    let $implicitThrow___39__ = false;
    let $finalStep___42__ = false;
    let $finalCatchArg___45__ = undefined___46__;
    $finally___48__: /*49*/ {
      try /*51*/ {
        $(x___55__);
        if (x___57__) {
          /*58*/ x___64__ = $(4);
          $finalStep___68__ = true;
          break $finally___70__;
        } /*71*/ else {
          x___77__ = $(5);
        }
      } catch ($finalImplicit___79__) /*80*/ {
        $implicitThrow___84__ = true;
        $finalCatchArg___88__ = $finalImplicit___87__;
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

tmpIfTest:
  - w @90          | ########## | 94          | none           | none
  - r @94          | 90
