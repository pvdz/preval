# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$((a = b = 2) ? $(100) : $(200));
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$((a = b = 2) ? $(100) : $(200));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
b = 2;
a = 2;
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
$(tmpCalleeParam);
$(2, 2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 2, 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
