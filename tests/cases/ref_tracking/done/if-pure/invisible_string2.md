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
} /*14*/ else {
  b___18__ = $2;
}
$(b___22__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
b:
  - w @4       | ########## | not read    | none           | 13,18
  - w @13      | ########## | 22          | 4              | none
  - w @18      | ########## | 22          | 4              | none
  - r @22      | 13,18
