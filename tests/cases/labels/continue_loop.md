# Preval test case

# continue_loop.md

> labels > continue_loop
>
> Labels that are direct parents of loops should not become blocks because that might break labeled continue statements

#TODO

## Input

`````js filename=intro
let fail = false;
foo: while(true) {
  $(1);
  fail = true;
  continue foo;
}
$(2);
`````

## Normalized

`````js filename=intro
let fail = false;
foo: while (true) {
  $(1);
  fail = true;
  continue foo;
}
$(2);
`````

## Uniformed

`````js filename=intro
var x = false;
x: while (true) {
  x(8);
  x = true;
  continue x;
}
x(8);
`````

## Output

`````js filename=intro
foo: while (true) {
  $(1);
  fail = true;
  continue foo;
}
$(2);
`````
