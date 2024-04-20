# Preval test case

# while10.md

> Ref tracking > While10
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  while (true) {
    if ($) {
      $(x); // Can still see 2 due to outer loop
    } else {
      $(x);
      x = 2;
      continue;
    }
  }
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  while (true) {
    if ($) {
      $(x___18__);
    } else {
      $(x___23__);
      x___27__ = 2;
      continue;
    }
  }
}
$(x___32__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,23,32    | none           | 27
  - r @18      | 4,27   
  - r @23      | 4,27   
  - w @27      | ########## | 18,23       | 4              | none
  - r @32      | 4      
