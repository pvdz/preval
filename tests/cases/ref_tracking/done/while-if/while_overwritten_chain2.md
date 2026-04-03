# Preval test case

# while_overwritten_chain2.md

> Ref tracking > Done > While-if > While overwritten chain2
>
> Just checking something

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
x = 2;            // overwrites x=1
while (true) {
  $(x);           // x=2 3 4
  if ($) {
    x = 3;        // overwrites x=2 3 4     
    if ($1) {
      x = 4;      // overwrites x=3 
    } else {
    }
    if ($) {
      if ($) {
        break;
      }
    }
  }
}
$(x);             // x=3 4
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___9__*/ x = 2;
/* stmt(10): */ while (true) {
  /*12~37*/ /* stmt(13): */ $(/*___16__*/ x);
  /* stmt(17): */ if ($) {
    /*19~36*/ /* stmt(20): */ /*___23__*/ x = 3;
    /* stmt(24): */ if ($1) {
      /*26~30*/ /* stmt(27): */ /*___30__*/ x = 4;
    } /*31~31*/ else {
    }
    /* stmt(32): */ if ($) {
      /*34~35*/ /* stmt(35): */ break;
    } /*36~36*/ else {
    }
  } /*37~37*/ else {
  }
}
/* stmt(38): */ $(/*___41__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 9
  - w @9       | ########## | 16          | 4              | 23
  - r @16      | 9,23,30
  - w @23      | ########## | 16,41       | 9,23,30        | 23,30
  - w @30      | ########## | 16,41       | 23             | 23
  - r @41      | 23,30
