# Preval test case

# while8.md

> Ref tracking > Done > While-continue > While8
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($) {
    $(x);
  } else {
    $(x);
    x = 2;
    continue;
  }
}
$(x); // unreachable
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~29*/ /*___10__*/ $continue: /*11~29*/ {
    if ($) {
      /*14~18*/ $(/*___18__*/ x);
    } /*19~29*/ else {
      $(/*___23__*/ x);
      /*___27__*/ x = 2;
      break /*___29__*/ $continue;
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,23       | none           | 27
  - r @18      | 4,27
  - r @23      | 4,27
  - w @27      | ########## | 18,23       | 4,27           | 27
