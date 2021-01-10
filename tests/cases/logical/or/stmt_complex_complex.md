# Preval test case

# complex_complex.md

> logical > and > complex_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
$(1) || $(2);
`````

## Normalized

`````js filename=intro
{
  let tmpLogicStmtOr = $(1);
  if (tmpLogicStmtOr) {
  } else {
    $(2);
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = x(8);
  if (x) {
  } else {
    x(8);
  }
}
`````

## Output

`````js filename=intro
let tmpLogicStmtOr = $(1);
if (tmpLogicStmtOr) {
} else {
  $(2);
}
`````
