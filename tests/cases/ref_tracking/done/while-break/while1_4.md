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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~34*/ /* stmt(9): */ /*___10__*/ $continue: /*11~34*/ {
    /* stmt(12): */ $(/*___15__*/ x);
    /* stmt(16): */ if ($) {
      /*18~28*/ /* stmt(19): */ if ($1) {
        /*21~25*/ /* stmt(22): */ /*___25__*/ x = 2;
      } /*26~26*/ else {
      }
      /* stmt(27): */ break /*___28__*/ $continue;
    } /*29~34*/ else {
      /* stmt(30): */ if ($2) {
        /*32~33*/ /* stmt(33): */ break;
      } /*34~34*/ else {
      }
    }
  }
}
/* stmt(35): */ $(/*___38__*/ x);
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
