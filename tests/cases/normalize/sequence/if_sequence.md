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
const tmpIfTest = $(2);
if (tmpIfTest) {
  $(3);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
