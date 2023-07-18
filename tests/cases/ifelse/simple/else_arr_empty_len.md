# Preval test case

# else_arr_empty_len.md

> Ifelse > Simple > Else arr empty len
>
> Eliminate simple tautology

#TODO

## Input

`````js filename=intro
if ([].length) $(1);
else $(2);
`````

## Pre Normal

`````js filename=intro
if ([].length) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = 0;
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
