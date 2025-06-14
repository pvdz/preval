# Preval test case

# while4.md

> Ref tracking > Done > While-continue > While4
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
    continue;
  } else {
  }
  x = 2;
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
      if ($) {
        /*21~23*/ break /*___23__*/ $continue;
      } /*24~28*/ else {
        /*___28__*/ x = 2;
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
  - w @4       | ########## | 18,34       | none           | 28
  - r @18      | 4,28
  - w @28      | ########## | 18,34       | 4,28           | 28
  - r @34      | 4,28
