# Preval test case

# loop_write_continue_read.md

> Ref tracking > Done > While-continue > Loop write continue read
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  $(x, 1);
  if (x < 4) continue;
  $(x, 2);
  break;
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 0;
/* stmt(6): */ while (true) {
  /*8~40*/ /* stmt(9): */ /*___10__*/ $continue: /*11~40*/ {
    /* stmt(13): */ /*___18__*/ x = /*___16__*/ x + 1;
    /* stmt(19): */ $(/*___22__*/ x, 1);
    /* stmt(24): */ const /*___25__*/ tmpIfTest = /*___27__*/ x < 4;
    /* stmt(29): */ if (/*___30__*/ tmpIfTest) {
      /*31~33*/ /* stmt(32): */ break /*___33__*/ $continue;
    } /*34~40*/ else {
      /* stmt(35): */ $(/*___38__*/ x, 2);
      /* stmt(40): */ break;
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16          | none           | 18
  - r @16      | 4,18
  - w @18      | ########## | 16,22,27,38 | 4,18           | 18
  - r @22      | 18
  - r @27      | 18
  - r @38      | 18

tmpIfTest:
  - w @25      | ########## | 30          | none           | none
  - r @30      | 25
