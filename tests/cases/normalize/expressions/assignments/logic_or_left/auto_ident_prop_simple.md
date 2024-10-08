# Preval test case

# auto_ident_prop_simple.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = b.c) || $(100));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = b.c) || $(100));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = b.c;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
$(1);
const b /*:object*/ = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = { c: 1 };
$( 1, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
