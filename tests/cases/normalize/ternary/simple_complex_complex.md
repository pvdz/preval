# Preval test case

# simple_complex_complex.md

> Normalize > Ternary > Simple complex complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

## Input

`````js filename=intro
const a = 1 ? $(2) : $(3)
const b = 0 ? $(4) : $(5)
$(a, b)
`````

## Pre Normal


`````js filename=intro
const a = 1 ? $(2) : $(3);
const b = 0 ? $(4) : $(5);
$(a, b);
`````

## Normalized


`````js filename=intro
let a = undefined;
a = $(2);
let b = undefined;
b = $(5);
$(a, b);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(2);
const b /*:unknown*/ = $(5);
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( 5 );
$( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 5
 - 3: 2, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
