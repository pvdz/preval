# Preval test case

# if_sequence.md

> Normalize > Sequence > If sequence
>
> Conditional sequence

## Input

`````js filename=intro
if (($(1), $(2))) $(3);
`````

## Pre Normal


`````js filename=intro
if (($(1), $(2))) $(3);
`````

## Normalized


`````js filename=intro
$(1);
const tmpIfTest = $(2);
if (tmpIfTest) {
  $(3);
} else {
}
`````

## Output


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(2);
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
if (a) {
  $( 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
