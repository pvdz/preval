# Preval test case

# while5.md

> Ref tracking > Done > While-break > While5
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x);
  if ($) {
    break;
  } else {
    x = 2;
  }
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~26*/ /* stmt(9): */ if ($) {
    /*11~24*/ /* stmt(12): */ $(/*___15__*/ x);
    /* stmt(16): */ if ($) {
      /*18~19*/ /* stmt(19): */ break;
    } /*20~24*/ else {
      /* stmt(21): */ /*___24__*/ x = 2;
    }
  } /*25~26*/ else {
    /* stmt(26): */ break;
  }
}
/* stmt(27): */ $(/*___30__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,30       | none           | 24
  - r @15      | 4,24
  - w @24      | ########## | 15,30       | 4,24           | 24
  - r @30      | 4,24
