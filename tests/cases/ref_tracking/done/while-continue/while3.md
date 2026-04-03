# Preval test case

# while3.md

> Ref tracking > Done > While-continue > While3
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
    continue;
  } else {
    x = 2;
  }
}
$(x); // unreachable (otherwise x=1 2)
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~30*/ /* stmt(9): */ if ($) {
    /*11~28*/ /* stmt(12): */ /*___13__*/ $continue: /*14~28*/ {
      /* stmt(15): */ $(/*___18__*/ x);
      /* stmt(19): */ if ($) {
        /*21~23*/ /* stmt(22): */ break /*___23__*/ $continue;
      } /*24~28*/ else {
        /* stmt(25): */ /*___28__*/ x = 2;
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
  - w @4       | ########## | 18,34       | none           | 28
  - r @18      | 4,28
  - w @28      | ########## | 18,34       | 4,28           | 28
  - r @34      | 4,28
