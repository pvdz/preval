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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~36*/ /* stmt(9): */ if ($) {
    /*11~34*/ /* stmt(12): */ /*___13__*/ $continue: /*14~34*/ {
      /* stmt(16): */ $(/*___19__*/ x);
      /* stmt(20): */ const /*___21__*/ tmpIfTest = $(0);
      /* stmt(25): */ if (/*___26__*/ tmpIfTest) {
        /*27~33*/ /* stmt(28): */ /*___31__*/ x = 2;
        /* stmt(32): */ break /*___33__*/ $continue;
      } /*34~34*/ else {
      }
    }
  } /*35~36*/ else {
    /* stmt(36): */ break;
  }
}
/* stmt(37): */ $(/*___40__*/ x);
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
