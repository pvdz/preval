# Preval test case

# invisible_string2.md

> Ref tracking > Done > If-pure > Invisible string2
>
> Both strings should be replaced with an empty string (or a custom string indicating they can't be observed)

## Options

- refTest

## Input

`````js filename=intro
let b = "def"; // never observed, overwritten in both branches in the loop
if (true) {
  if ($) {
    b = $1;
  }
  else {
    b = $2;
  }
  $(b);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ b = `def`;
if ($) {
  /*9~17*/ /*___13__*/ b = $1;
  $($1);
} /*18~26*/ else {
  /*___22__*/ b = $2;
  $($2);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
b:
  - w @4       | ########## | not read    | none           | 13,22
  - w @13      | ########## | not read    | 4              | none
  - w @22      | ########## | not read    | 4              | none
