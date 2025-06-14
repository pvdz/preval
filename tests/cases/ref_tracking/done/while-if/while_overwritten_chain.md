# Preval test case

# while_overwritten_chain.md

> Ref tracking > Done > While-if > While overwritten chain
>
> Just checking something

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
x = 2;            // overwrites x=1
while (true) { 
  x = 6;          // overwrites x=2 6
  $(x);           // x=6
  if ($) {
    x = 7;        // overwrites x=6
    if ($) {
      if ($) {
        break;
      }
    }
  }
}
// Now the only exitWrite is x=7, but how can we tell?
$(x);             // x=7
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
/*___9__*/ x = 2;
while (true) {
  /*12~33*/ /*___16__*/ x = 6;
  $(/*___20__*/ x);
  if ($) {
    /*23~32*/ /*___27__*/ x = 7;
    if ($) {
      /*30~31*/ break;
    } /*32~32*/ else {
    }
  } /*33~33*/ else {
  }
}
$(/*___37__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 9
  - w @9       | ########## | not read    | 4              | 16
  - w @16      | ########## | 20          | 9,16,27        | 16,27
  - r @20      | 16
  - w @27      | ########## | 37          | 16             | 16
  - r @37      | 27
