# Preval test case

# while_overwritten_chain.md

> Ref tracking > Done > While-if > While overwritten chain
>
> Just checking something

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
x = 10;           // <-- but here too
while (true) { 
  x = 6;          // <--
  $(x); // 6
  if ($) {
    x = 7;        // <-- this is the only exitWrite for the break. but how?
    if ($) {
      if ($) {
        break;
      }
    }
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
  $(x___20__);
  if ($) {
    /*23*/ x___27__ = 7;
    if ($) {
      /*30*/ break;
    } /*32*/ else {
    }
  } /*33*/ else {
  }
}
$(x___37__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 9
  - w @9       | ########## | not read    | 4              | 16
  - w @16      | ########## | 20,37       | 9,16,27        | 27,16
  - r @20      | 16
  - w @27      | ########## | 37          | 16,27          | 16,27
  - r @37      | 27,16
