# Preval test case

# break_loop.md

> labels > break_loop
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: while(true) {
  $(1);
  break foo;
}
$(2);
`````

## Normalized

`````js filename=intro
foo: while (true) {
  $(1);
  break foo;
}
$(2);
`````

## Uniformed

`````js filename=intro
x: while (true) {
  x(8);
  break x;
}
x(8);
`````

## Output

`````js filename=intro
foo: while (true) {
  $(1);
  break foo;
}
$(2);
`````
