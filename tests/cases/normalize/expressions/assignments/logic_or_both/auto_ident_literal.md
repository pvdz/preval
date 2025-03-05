# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") || (a = "foo"));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = `foo`) || (a = `foo`));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  a = `foo`;
  tmpCalleeParam = `foo`;
}
$(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
$(`foo`);
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "foo" );
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
