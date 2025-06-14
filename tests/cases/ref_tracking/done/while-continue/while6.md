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
let /*___4__*/ x = 1;
while (true) {
  /*8~30*/ if ($) {
    /*11~28*/ /*___13__*/ $continue: /*14~28*/ {
      $(/*___18__*/ x);
      /*___22__*/ x = 2;
      if ($) {
        /*25~27*/ break /*___27__*/ $continue;
      } /*28~28*/ else {
      }
    }
  } /*29~30*/ else {
    break;
  }
}
$(/*___34__*/ x);
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
