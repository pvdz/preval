# Preval test case

# while_overwritten_chain2.md

> Ref tracking > Done > While-if > While overwritten chain2
>
> Just checking something

#TODO

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
x = 2;            // overwrites x=1
while (true) {
  $(x);           // x=2 3 4
  if ($) {
    x = 3;        // overwrites x=2 3 4     
    if ($1) {
      x = 4;      // overwrites x=3 
    } else {
    }
    if ($) {
      if ($) {
        break;
      }
    }
  }
}
$(x);             // x=3 4
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
x___9__ = 2;
while (true) {
  /*12*/ $(x___16__);
  if ($) {
    /*19*/ x___23__ = 3;
    if ($1) {
      /*26*/ x___30__ = 4;
    } /*31*/ else {
    }
    if ($) {
      /*34*/ break;
    } /*36*/ else {
    }
  } /*37*/ else {
  }
}
$(x___41__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 9
  - w @9       | ########## | 16,41       | 4              | 23
  - r @16      | 9,23,30
  - w @23      | ########## | 16,41       | 9,23,30        | 23,30
  - w @30      | ########## | 16,41       | 23             | 23
  - r @41      | 9,23,30
