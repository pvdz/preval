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
let b___4__ = `def`;
if ($) {
  /*9*/ b___13__ = $1;
  $($1);
} /*18*/ else {
  b___22__ = $2;
  $($2);
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
b:
  - w @4       | ########## | not read    | none           | 13,22
  - w @13      | ########## | not read    | 4              | none
  - w @22      | ########## | not read    | 4              | none
