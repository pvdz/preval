# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = "foo") });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = `foo`) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = `foo`;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { [`0`]: `f`, [`1`]: `o`, [`2`]: `o` };
$(tmpCalleeParam);
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  [ "0" ]: "f",
  [ "1" ]: "o",
  [ "2" ]: "o",
};
$( a );
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"f"', 1: '"o"', 2: '"o"' }
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
