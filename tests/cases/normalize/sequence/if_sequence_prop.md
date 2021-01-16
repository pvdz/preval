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
$(1);
{
  let tmpBindingInit = $(2);
  let ifTestTmp = tmpBindingInit.foo;
  if (ifTestTmp) {
    $(3);
  }
}
`````

## Output

`````js filename=intro
$(1);
let tmpBindingInit = $(2);
let ifTestTmp = tmpBindingInit.foo;
if (ifTestTmp) {
  $(3);
}
`````
