# Preval test case

# if_else.md

> normalize > blocks > if_else
>
> Add blocks to sub-statements

## Input

`````js filename=intro
if ($(1)) $(2);
else $(3);
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = $(1);
  if (ifTestTmp) {
    $(2);
  } else {
    $(3);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = $(1);
if (ifTestTmp) {
  $(2);
} else {
  $(3);
}
`````
