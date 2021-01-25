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
const tmpBindingInit = $(2);
const tmpIfTest = tmpBindingInit.foo;
if (tmpIfTest) {
  $(3);
}
`````

## Output

`````js filename=intro
$(1);
const tmpBindingInit = $(2);
const tmpIfTest = tmpBindingInit.foo;
if (tmpIfTest) {
  $(3);
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
