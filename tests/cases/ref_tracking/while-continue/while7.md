# Preval test case

# while7.md

> Ref tracking > While7
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
    continue;
  } else {
    $(x);
    x = 2;
  }
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  if ($) {
    $(x___15__);
    continue;
  } else {
    $(x___21__);
    x___25__ = 2;
  }
}
$(x___29__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,21       | none           | 25
  - r @15      | 4,25   
  - r @21      | 4,25   
  - w @25      | ########## | 15,21,29    | 4              | none
  - r @29      | 25     
