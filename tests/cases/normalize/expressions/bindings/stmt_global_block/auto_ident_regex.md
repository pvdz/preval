# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident regex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = /foo/;
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = /foo/;
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = /foo/;
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
