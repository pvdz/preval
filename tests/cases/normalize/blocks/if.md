# Preval test case

# if.md

> normalize > blocks > if
>
> Add blocks to sub-statements

## Input

`````js filename=intro
if ($(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = $(1);
  if (ifTestTmp) {
    $(2);
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = x(8);
  if (x) {
    x(8);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = $(1);
if (ifTestTmp) {
  $(2);
}
`````
