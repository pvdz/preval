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

## Pre Normal

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
} else {
}
`````

## Output

`````js filename=intro
$(1);
const tmpCompObj = $(2);
const tmpIfTest = tmpCompObj.foo;
if (tmpIfTest) {
  $(3);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = a.foo;
if (b) {
  $( 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
