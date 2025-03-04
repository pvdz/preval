# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) ? $(100) : $(200));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) ? $(100) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
$(100);
a = undefined;
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
$(100);
const tmpCalleeParam /*:unknown*/ = $(200);
$(tmpCalleeParam);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( 200 );
$( a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: 200
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
