# Preval test case

# nested.md

> labels > nested
>
> Labels should not throw

The label of the continue should be updated because the duplicate labels will be renamed.

#TODO

## Input

`````js filename=intro
a: {}
a: while (true) {
  $(1);
  continue a;
}
a: {}
`````

## Normalized

`````js filename=intro
{
}
a_1: while (true) {
  $(1);
  continue a_1;
}
{
}
`````

## Uniformed

`````js filename=intro
{
}
x: while (true) {
  x(8);
  continue x;
}
{
}
`````

## Output

`````js filename=intro
a_1: while (true) {
  $(1);
  continue a_1;
}
`````
