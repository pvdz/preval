# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Let > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = /foo/;
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = /foo/;
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = /foo/;
$(xyz);
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const xyz = /foo/;
$(xyz);
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
