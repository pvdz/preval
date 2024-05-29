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
  /*10*/ $(x___14__);
  x___20__ = $(2);
  here___22__: /*23*/ {
    $(x___27__);
    x___33__ = $(3);
    try /*35*/ {
      $(x___39__);
      if (x___41__) {
        /*42*/ x___48__ = $(4);
        break here___50__;
      } /*51*/ else {
        x___57__ = $(5);
      }
    } finally /*58*/ {
      const tmpIfTest___61__ = $();
      if (tmpIfTest___65__) {
        /*66*/ $(x___70__);
        x___76__ = $(61);
        break here___78__;
      } /*79*/ else {
        $(x___83__);
        x___89__ = $(62);
        break here___91__;
      }
    }
    $(x___95__);
    x___101__ = $(7);
  }
  $(x___105__);
  x___111__ = $(8);
} /*112*/ else {
}
$(x___116__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,14,116    | none           | 20
  - r @9       | 4
  - r @14      | 4
  - w @20      | ########## | 27          | 4              | 33
  - r @27      | 20
  - w @33      | ########## | 39,41,70,83 | 20             | 48,57,76,89
  - r @39      | 33
  - r @41      | 33
  - w @48      | ########## | 70,83,105   | 33             | 76,89,111
  - w @57      | ########## | 70,83,95    | 33             | 76,89,101
  - r @70      | 33,48,57
  - w @76      | ########## | 105         | 33,48,57       | 111
  - r @83      | 33,48,57
  - w @89      | ########## | 105         | 33,48,57       | 111
  - r @95      | 57
  - w @101     | ########## | 105         | 57             | 111
  - r @105     | 48,76,89,101
  - w @111     | ########## | 116         | 48,76,89,101   | none
  - r @116     | 4,111

tmpIfTest:
  - w @61      | ########## | 65          | none           | none
  - r @65      | 61
