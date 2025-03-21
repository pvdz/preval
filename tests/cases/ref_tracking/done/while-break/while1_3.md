# Preval test case

# while1_3.md

> Ref tracking > Done > While-break > While1 3
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x); // x=1 2
  if ($) {
    x = 2;
    continue;
  } else {
  }
  if ($()) break;
}
$(x); // x=1 2
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $continue___13__: /*14*/ {
      $(x___18__);
      if ($) {
        /*21*/ x___25__ = 2;
        break $continue___27__;
      } /*28*/ else {
        const tmpIfTest___31__ = $();
        if (tmpIfTest___35__) {
          /*36*/ break;
        } /*38*/ else {
        }
      }
    }
  } /*39*/ else {
    break;
  }
}
$(x___44__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,44       | none           | 25
  - r @18      | 4,25
  - w @25      | ########## | 18,44       | 4,25           | 25
  - r @44      | 4,25

tmpIfTest:
  - w @31      | ########## | 35          | none           | none
  - r @35      | 31
