# Preval test case

# else_class.md

> Ifelse > Simple > Else class
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (class{}) $(1);
else $(2);
`````

## Pre Normal

`````js filename=intro
if (class {}) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = class {};
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
