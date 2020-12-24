# Preval test case

# return_sequence.md

> normalize > sequence > return_sequence
>
> Conditional sequence with property

#TODO

## Input

`````js filename=intro
if (($(1), $(2)).foo) $(3);
`````

## Normalized

`````js filename=intro
var tmpObj;
$(1);
tmpObj = $(2);
if (tmpObj.foo) {
  $(3);
}
`````

## Output

`````js filename=intro
var tmpObj;
$(1);
tmpObj = $(2);
if (tmpObj.foo) {
  $(3);
}
`````
