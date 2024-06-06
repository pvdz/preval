# Preval test case

# else_not.md

> Ifelse > Invert > Else not
>
> Invert the logic

## Input

`````js filename=intro
if (!$(1)) $(2);
else $(3);
`````

## Pre Normal


`````js filename=intro
if (!$(1)) $(2);
else $(3);
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(3);
} else {
  $(2);
}
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(3);
} else {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 3 );
}
else {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
