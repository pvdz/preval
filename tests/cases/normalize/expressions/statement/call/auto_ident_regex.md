# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Call > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(/foo/);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(/foo/);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = /foo/;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = /foo/;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = /foo/;
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
