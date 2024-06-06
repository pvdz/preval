# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = "foo") });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = `foo`) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = `foo`;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { x: `foo` };
$(tmpCalleeParam);
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: "foo" };
$( a );
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '"foo"' }
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
