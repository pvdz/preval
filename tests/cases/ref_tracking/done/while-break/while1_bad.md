# Preval test case

# while1_bad.md

> Ref tracking > Done > While-break > While1 bad
>
> Regression

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x); // x=1 2
  if ($(0)) {
    x = 2;
    continue;
  } else {
  }
}
$(x); // unreachable, without DCE it'll be x=1 2
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $continue___13__: /*14*/ {
      $(x___19__);
      const tmpIfTest___21__ = $(0);
      if (tmpIfTest___26__) {
        /*27*/ x___31__ = 2;
        break $continue___33__;
      } /*34*/ else {
      }
    }
  } /*35*/ else {
    break;
  }
}
$(x___40__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,40       | none           | 31
  - r @19      | 4,31
  - w @31      | ########## | 19,40       | 4,31           | 31
  - r @40      | 4,31

tmpIfTest:
  - w @21      | ########## | 26          | none           | none
  - r @26      | 21
