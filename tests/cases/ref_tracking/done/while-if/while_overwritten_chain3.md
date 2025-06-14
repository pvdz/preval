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
let /*___4__*/ x = 5;
/*___9__*/ x = 10;
while (true) {
  /*12~25*/ /*___16__*/ x = 6;
  if ($) {
    /*19~24*/ /*___23__*/ x = 7;
    break;
  } /*25~25*/ else {
  }
}
$(/*___29__*/ x);
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
