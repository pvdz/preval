# Preval test case

# while1.md

> Ref tracking > Done > While-break > While1
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
    x = 2;
    continue;
  } else {
  }
}
$(x); // unreachable, without DCE it'll be 1,2
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~30*/ if ($) {
    /*11~28*/ /*___13__*/ $continue: /*14~28*/ {
      $(/*___18__*/ x);
      if ($) {
        /*21~27*/ /*___25__*/ x = 2;
        break /*___27__*/ $continue;
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
  - w @4       | ########## | 18,34       | none           | 25
  - r @18      | 4,25
  - w @25      | ########## | 18,34       | 4,25           | 25
  - r @34      | 4,25
