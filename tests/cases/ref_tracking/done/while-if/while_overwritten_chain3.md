# Preval test case

# while_overwritten_chain3.md

> Ref tracking > Done > While-if > While overwritten chain3
>
> Just checking something

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
x = 10;           // <-- always overwritten by x=6
while (true) { 
  x = 6;          // <-- always overwritten by x=7 when breaking
  if ($) {
    x = 7;        // <-- this is the only exitWrite for the break. but how?
    break;
  }
}
// Now the only exitWrite is x=7, but how can we tell?
$(x); // 7
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 5;
x___9__ = 10;
while (true) {
  /*12*/ x___16__ = 6;
  if ($) {
    /*19*/ x___23__ = 7;
    break;
  } /*25*/ else {
  }
}
$(x___29__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 9
  - w @9       | ########## | not read    | 4              | 16
  - w @16      | ########## | not read    | 9,16           | 16,23
  - w @23      | ########## | 29          | 16             | none
  - r @29      | 23
