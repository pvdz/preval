# Preval test case

# loopy.md

> labels > loopy
>
> An alternative way of looping

#TODO

## Input

`````js filename=intro
woop: while (true) {
  $(1);
  continue woop;
  $(2);
}
`````

## Normalized

`````js filename=intro
woop: while (true) {
  $(1);
  continue woop;
  $(2);
}
`````

## Uniformed

`````js filename=intro
x: while (true) {
  x(8);
  continue x;
  x(8);
}
`````

## Output

`````js filename=intro
woop: while (true) {
  $(1);
  continue woop;
  $(2);
}
`````
