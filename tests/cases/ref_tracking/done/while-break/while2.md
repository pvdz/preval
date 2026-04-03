# Preval test case

# while2.md

> Ref tracking > Done > While-break > While2
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
    x = 2;
    break;
  } else {
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
      /*18~23*/ /* stmt(19): */ /*___22__*/ x = 2;
      /* stmt(23): */ break;
    } /*24~24*/ else {
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
  - w @4       | ########## | 15,30       | none           | 22
  - r @15      | 4
  - w @22      | ########## | 30          | 4              | none
  - r @30      | 4,22
