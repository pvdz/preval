# Preval test case

# for_in.md

> normalize > blocks > for_in
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for (x in $(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  const tmpForInRhs = $(1);
  for (x in tmpForInRhs) {
    $(2);
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = x(8);
  for (x in x) {
    x(8);
  }
}
`````

## Output

`````js filename=intro
const tmpForInRhs = $(1);
for (x in tmpForInRhs) {
  $(2);
}
`````
