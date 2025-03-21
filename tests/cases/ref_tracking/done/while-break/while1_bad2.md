# Preval test case

# while1_bad2.md

> Ref tracking > Done > While-break > While1 bad2
>
> Regression

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($(0)) {
    A: {
      $(x);
      const test = 0; // Note: ref tracking comes before first pass of value tracking
      if (test) {
        x = 2;
        break A;
      } else {
      }
    }
    $(x);
  } else {
    break;
  }
}
$(x); // x=1 2
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ const tmpIfTest___11__ = $(0);
  if (tmpIfTest___16__) {
    /*17*/ A___19__: /*20*/ {
      $(x___24__);
      const test___27__ = 0;
      if (test___30__) {
        /*31*/ x___35__ = 2;
        break A___37__;
      } /*38*/ else {
      }
    }
    $(x___42__);
  } /*43*/ else {
    break;
  }
}
$(x___48__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 24,42,48    | none           | 35
  - r @24      | 4,35
  - w @35      | ########## | 24,42,48    | 4,35           | 35
  - r @42      | 4,35
  - r @48      | 4,35

tmpIfTest:
  - w @11      | ########## | 16          | none           | none
  - r @16      | 11

test:
  - w @27      | ########## | 30          | none           | none
  - r @30      | 27
