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
if ($(2)) {
  $(3);
}
`````

## Output

`````js filename=intro
$(1);
if ($(2)) {
  $(3);
}
`````