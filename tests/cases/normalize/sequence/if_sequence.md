# Preval test case

# return_sequence.md

> normalize > sequence > return_sequence
>
> Conditional sequence

#TODO

## Input

`````js filename=intro
if (($(1), $(2))) $(3);
`````

## Normalized

`````js filename=intro
$(1);
{
  let ifTestTmp = $(2);
  if (ifTestTmp) {
    $(3);
  }
}
`````

## Uniformed

`````js filename=intro
x(8);
{
  var x = x(8);
  if (x) {
    x(8);
  }
}
`````

## Output

`````js filename=intro
$(1);
let ifTestTmp = $(2);
if (ifTestTmp) {
  $(3);
}
`````
