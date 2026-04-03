# Preval test case

# while13.md

> Ref tracking > Done > While-continue > While13
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  if ($(false)) {
    $(x);
    x = 5;
    continue;
  } else {
    x = 4;
  }
  x = 3;
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~44*/ /* stmt(9): */ if ($) {
    /*11~42*/ /* stmt(12): */ /*___13__*/ $continue: /*14~42*/ {
      /* stmt(16): */ const /*___17__*/ tmpIfTest = $(false);
      /* stmt(21): */ if (/*___22__*/ tmpIfTest) {
        /*23~33*/ /* stmt(24): */ $(/*___27__*/ x);
        /* stmt(28): */ /*___31__*/ x = 5;
        /* stmt(32): */ break /*___33__*/ $continue;
      } /*34~42*/ else {
        /* stmt(35): */ /*___38__*/ x = 4;
        /* stmt(39): */ /*___42__*/ x = 3;
      }
    }
  } /*43~44*/ else {
    /* stmt(44): */ break;
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27          | none           | 31,38
  - r @27      | 4,31,42
  - w @31      | ########## | 27          | 4,31,42        | 31,38
  - w @38      | ########## | not read    | 4,31,42        | 42
  - w @42      | ########## | 27          | 38             | 31,38

tmpIfTest:
  - w @17      | ########## | 22          | none           | none
  - r @22      | 17
