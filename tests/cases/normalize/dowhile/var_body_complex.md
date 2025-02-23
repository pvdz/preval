# Preval test case

# var_body_complex.md

> Normalize > Dowhile > Var body complex
>
> Regression specific to using this kind of init

## Input

`````js filename=intro
do var a = $($(2));
while (0);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
while (true) {
  a = $($(2));
  if (0) {
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = $(2);
a = tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(2);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
