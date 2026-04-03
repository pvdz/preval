# Preval test case

# while14.md

> Ref tracking > Done > While-continue > While14
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
    continue;
  } else {
  }
  if ($) {
    $(x);
    x = 6;
    break;
  }
  x = 3;
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~49*/ /* stmt(9): */ if ($) {
    /*11~47*/ /* stmt(12): */ /*___13__*/ $continue: /*14~47*/ {
      /* stmt(16): */ const /*___17__*/ tmpIfTest = $(false);
      /* stmt(21): */ if (/*___22__*/ tmpIfTest) {
        /*23~29*/ /* stmt(24): */ $(/*___27__*/ x);
        /* stmt(28): */ break /*___29__*/ $continue;
      } /*30~47*/ else {
        /* stmt(31): */ if ($) {
          /*33~42*/ /* stmt(34): */ $(/*___37__*/ x);
          /* stmt(38): */ /*___41__*/ x = 6;
          /* stmt(42): */ break;
        } /*43~47*/ else {
          /* stmt(44): */ /*___47__*/ x = 3;
        }
      }
    }
  } /*48~49*/ else {
    /* stmt(49): */ break;
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27,37       | none           | 41,47
  - r @27      | 4,47
  - r @37      | 4,47
  - w @41      | ########## | not read    | 4,47           | none
  - w @47      | ########## | 27,37       | 4,47           | 41,47

tmpIfTest:
  - w @17      | ########## | 22          | none           | none
  - r @22      | 17
