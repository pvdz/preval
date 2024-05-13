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
let x = 5;
x = 10;           // <-- but here too
while (true) { 
  $(x); // 6
  if ($) {
    x = 65;       // <-- this fully overwrites, should replace     
    if ($1) {
      x = 7;      // <-- this doesn't fully overwrite, should amend with 65 
    } else {
    }
    if ($) {
      if ($) {
        break;
      }
    }
  }
}
// The x=7 should be amended. But how do we know it wasn't fully overwritten?
$(x); // 65 or 7 but not 10 (because 65 will overwrite that before breaking)
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 5;
x___9__ = 10;
while (true) {
  /*12*/ $(x___16__);
  if ($) {
    /*19*/ x___23__ = 65;
    if ($1) {
      /*26*/ x___30__ = 7;
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
  - w @9       | ########## | 16,41       | 4              | 23,30
  - r @16      | 9,23,30
  - w @23      | ########## | 16,41       | 9,23,30        | 30,23
  - w @30      | ########## | 16,41       | 23,9,30        | 23,30
  - r @41      | 23,30,9
