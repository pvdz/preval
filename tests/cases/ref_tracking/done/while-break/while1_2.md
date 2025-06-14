# Preval test case

# while1_2.md

> Ref tracking > Done > While-break > While1 2
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
    if ($1) {
      // Now this exitWrite should be amended in the parent
      x = 2;
    }
    continue;
  } else {
  }
}
$(x); // unreachable. if it was, then x=1 or 2.
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~34*/ if ($) {
    /*11~32*/ /*___13__*/ $continue: /*14~32*/ {
      $(/*___18__*/ x);
      if ($) {
        /*21~31*/ if ($1) {
          /*24~28*/ /*___28__*/ x = 2;
        } /*29~29*/ else {
        }
        break /*___31__*/ $continue;
      } /*32~32*/ else {
      }
    }
  } /*33~34*/ else {
    break;
  }
}
$(/*___38__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,38       | none           | 28
  - r @18      | 4,28
  - w @28      | ########## | 18,38       | 4,28           | 28
  - r @38      | 4,28
