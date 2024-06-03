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
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $continue___13__: /*14*/ {
      $(x___18__);
      if ($) {
        /*21*/ break $continue___23__;
      } /*24*/ else {
        x___28__ = 2;
      }
    }
  } /*29*/ else {
    break;
  }
}
$(x___34__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,34       | none           | 28
  - r @18      | 4,28
  - w @28      | ########## | 18,34       | 4,28           | 28
  - r @34      | 4,28
