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
let /*___4__*/ x = 1;
while (true) {
  /*8~44*/ if ($) {
    /*11~42*/ /*___13__*/ $continue: /*14~42*/ {
      const /*___17__*/ tmpIfTest = $(false);
      if (/*___22__*/ tmpIfTest) {
        /*23~33*/ $(/*___27__*/ x);
        /*___31__*/ x = 5;
        break /*___33__*/ $continue;
      } /*34~42*/ else {
        /*___38__*/ x = 4;
        /*___42__*/ x = 3;
      }
    }
  } /*43~44*/ else {
    break;
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
