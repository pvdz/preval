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
/* stmt(3): */ let /*___4__*/ x = 5;
/* stmt(6): */ /*___9__*/ x = 10;
/* stmt(10): */ while (true) {
  /*12~25*/ /* stmt(13): */ /*___16__*/ x = 6;
  /* stmt(17): */ if ($) {
    /*19~24*/ /* stmt(20): */ /*___23__*/ x = 7;
    /* stmt(24): */ break;
  } /*25~25*/ else {
  }
}
/* stmt(26): */ $(/*___29__*/ x);
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
