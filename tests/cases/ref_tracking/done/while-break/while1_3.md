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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~40*/ /* stmt(9): */ if ($) {
    /*11~38*/ /* stmt(12): */ /*___13__*/ $continue: /*14~38*/ {
      /* stmt(15): */ $(/*___18__*/ x);
      /* stmt(19): */ if ($) {
        /*21~27*/ /* stmt(22): */ /*___25__*/ x = 2;
        /* stmt(26): */ break /*___27__*/ $continue;
      } /*28~38*/ else {
        /* stmt(30): */ const /*___31__*/ tmpIfTest = $();
        /* stmt(34): */ if (/*___35__*/ tmpIfTest) {
          /*36~37*/ /* stmt(37): */ break;
        } /*38~38*/ else {
        }
      }
    }
  } /*39~40*/ else {
    /* stmt(40): */ break;
  }
}
/* stmt(41): */ $(/*___44__*/ x);
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
