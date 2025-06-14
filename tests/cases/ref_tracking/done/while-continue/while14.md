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
let /*___4__*/ x = 1;
while (true) {
  /*8~49*/ if ($) {
    /*11~47*/ /*___13__*/ $continue: /*14~47*/ {
      const /*___17__*/ tmpIfTest = $(false);
      if (/*___22__*/ tmpIfTest) {
        /*23~29*/ $(/*___27__*/ x);
        break /*___29__*/ $continue;
      } /*30~47*/ else {
        if ($) {
          /*33~42*/ $(/*___37__*/ x);
          /*___41__*/ x = 6;
          break;
        } /*43~47*/ else {
          /*___47__*/ x = 3;
        }
      }
    }
  } /*48~49*/ else {
    break;
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
