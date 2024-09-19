# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = /foo/;
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = /foo/;
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
$(a);
`````

## Output


`````js filename=intro
const a /*:regex*/ = /foo/;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
