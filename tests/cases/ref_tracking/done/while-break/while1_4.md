# Preval test case

# while1_4.md

> Ref tracking > Done > While-break > While1 4
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  $(x); // x=1 2
  if ($) {
    if ($1) {
      // Now this exitWrite should be amended in the parent
      x = 2;
    }
    continue;
  } else {
  }
  if ($2) break;
}
$(x); // x=1 2
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~34*/ /*___10__*/ $continue: /*11~34*/ {
    $(/*___15__*/ x);
    if ($) {
      /*18~28*/ if ($1) {
        /*21~25*/ /*___25__*/ x = 2;
      } /*26~26*/ else {
      }
      break /*___28__*/ $continue;
    } /*29~34*/ else {
      if ($2) {
        /*32~33*/ break;
      } /*34~34*/ else {
      }
    }
  }
}
$(/*___38__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,38       | none           | 25
  - r @15      | 4,25
  - w @25      | ########## | 15,38       | 4,25           | 25
  - r @38      | 4,25
