# Preval test case

# while6.md

> Ref tracking > Done > While-continue > While6
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x);
  x = 2;
  if ($) {
    continue;
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
  /*8~30*/ /* stmt(9): */ if ($) {
    /*11~28*/ /* stmt(12): */ /*___13__*/ $continue: /*14~28*/ {
      /* stmt(15): */ $(/*___18__*/ x);
      /* stmt(19): */ /*___22__*/ x = 2;
      /* stmt(23): */ if ($) {
        /*25~27*/ /* stmt(26): */ break /*___27__*/ $continue;
      } /*28~28*/ else {
      }
    }
  } /*29~30*/ else {
    /* stmt(30): */ break;
  }
}
/* stmt(31): */ $(/*___34__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,34       | none           | 22
  - r @18      | 4,22
  - w @22      | ########## | 18,34       | 4,22           | 22
  - r @34      | 4,22
