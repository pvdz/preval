# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > If > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if (/foo/);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
if (/foo/);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = /foo/;
$(a);
`````

## Output


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
