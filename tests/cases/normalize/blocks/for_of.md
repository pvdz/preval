# Preval test case

# for_of.md

> normalize > blocks > for_of
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for (x of $(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  const tmpForOfRhs = $(1);
  for (x of tmpForOfRhs) {
    $(2);
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = x(8);
  for (x of x) {
    x(8);
  }
}
`````

## Output

`````js filename=intro
const tmpForOfRhs = $(1);
for (x of tmpForOfRhs) {
  $(2);
}
`````
