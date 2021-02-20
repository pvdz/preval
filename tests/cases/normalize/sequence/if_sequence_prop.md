# Preval test case

# if_sequence_prop.md

> Normalize > Sequence > If sequence prop
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
const tmpCompObj = $(2);
const tmpIfTest = tmpCompObj.foo;
if (tmpIfTest) {
  $(3);
}
`````

## Output

`````js filename=intro
$(1);
const tmpCompObj = $(2);
const tmpIfTest = tmpCompObj.foo;
if (tmpIfTest) {
  $(3);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
