# Preval test case

# continue_outer_loop.md

> labels > continue_outer_loop
>
> A continue may not reference its current loop

#TODO

## Input

`````js filename=intro
foo: while (true) {
  $(1);
  while (true) {
    $(2);
    continue foo;
  }
}
`````

## Normalized

`````js filename=intro
foo: while (true) {
  $(1);
  while (true) {
    $(2);
    continue foo;
  }
}
`````

## Output

`````js filename=intro
foo: while (true) {
  $(1);
  while (true) {
    $(2);
    continue foo;
  }
}
`````
