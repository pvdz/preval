# Preval test case

# while3.md

> Ref tracking > Done > While-if > While3
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x);
  x = 2;
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~21*/ if ($) {
    /*11~19*/ $(/*___15__*/ x);
    /*___19__*/ x = 2;
  } /*20~21*/ else {
    break;
  }
}
$(/*___25__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,25       | none           | 19
  - r @15      | 4,19
  - w @19      | ########## | 15,25       | 4,19           | 19
  - r @25      | 4,19
