# Preval test case

# if-test.md

> Ref tracking > Done > If-pure > If-test
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if (x) {
    x = 2;
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
if (/*___7__*/ x) {
  /*8~12*/ /*___12__*/ x = 2;
} /*13~18*/ else {
  $(/*___17__*/ x, 3);
}
/*___22__*/ x = 4;
$(/*___26__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 7,17        | none           | 12,22
  - r @7       | 4
  - w @12      | ########## | not read    | 4              | 22
  - r @17      | 4
  - w @22      | ########## | 26          | 4,12           | none
  - r @26      | 22
