# Preval test case

# while7_1.md

> Ref tracking > Done > While-continue > While7 1
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($) {
    $(x);     // x=1 2
    continue;
  } else {
    $(x);     // x=1 2
    x = 2;
  }
  if ($()) break;
}
$(x);         // x=2 (it has to go through x=2 if it is to reach the break)
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~39*/ /* stmt(9): */ /*___10__*/ $continue: /*11~39*/ {
    /* stmt(12): */ if ($) {
      /*14~20*/ /* stmt(15): */ $(/*___18__*/ x);
      /* stmt(19): */ break /*___20__*/ $continue;
    } /*21~39*/ else {
      /* stmt(23): */ $(/*___26__*/ x);
      /* stmt(27): */ /*___30__*/ x = 2;
      /* stmt(31): */ const /*___32__*/ tmpIfTest = $();
      /* stmt(35): */ if (/*___36__*/ tmpIfTest) {
        /*37~38*/ /* stmt(38): */ break;
      } /*39~39*/ else {
      }
    }
  }
}
/* stmt(40): */ $(/*___43__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,26       | none           | 30
  - r @18      | 4,30
  - r @26      | 4,30
  - w @30      | ########## | 18,26,43    | 4,30           | 30
  - r @43      | 30

tmpIfTest:
  - w @32      | ########## | 36          | none           | none
  - r @36      | 32
