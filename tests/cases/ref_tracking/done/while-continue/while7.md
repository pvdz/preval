# Preval test case

# while7.md

> Ref tracking > Done > While-continue > While7
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($LOOP_NO_UNROLLS_LEFT) {
  if ($) {
    $(x); // x=1 2
    continue;
  } else {
    $(x); // x=1 2
    x = 2;
  }
}
$(x); // unreachable
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (/*___7__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*8~29*/ /* stmt(9): */ /*___10__*/ $continue: /*11~29*/ {
    /* stmt(12): */ if ($) {
      /*14~20*/ /* stmt(15): */ $(/*___18__*/ x);
      /* stmt(19): */ break /*___20__*/ $continue;
    } /*21~29*/ else {
      /* stmt(22): */ $(/*___25__*/ x);
      /* stmt(26): */ /*___29__*/ x = 2;
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,25       | none           | 29
  - r @18      | 4,29
  - r @25      | 4,29
  - w @29      | ########## | 18,25       | 4,29           | 29
