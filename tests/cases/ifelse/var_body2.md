# Preval test case

# var_body2.md

> Ifelse > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
if ($(true)) var x = 0;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($(true)) x = 0;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 0;
} else {
}
$(x);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(0);
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 0 );
}
else {
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
