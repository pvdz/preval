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
let /*___4__*/ x = 1;
while (true) {
  /*8~40*/ if ($) {
    /*11~38*/ /*___13__*/ $continue: /*14~38*/ {
      $(/*___18__*/ x);
      if ($) {
        /*21~27*/ /*___25__*/ x = 2;
        break /*___27__*/ $continue;
      } /*28~38*/ else {
        const /*___31__*/ tmpIfTest = $();
        if (/*___35__*/ tmpIfTest) {
          /*36~37*/ break;
        } /*38~38*/ else {
        }
      }
    }
  } /*39~40*/ else {
    break;
  }
}
$(/*___44__*/ x);
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
